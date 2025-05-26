"use server";

import { prisma } from "@/lib/prisma";
import { Workbook } from "exceljs";

export const exportExcelAction = async () => {
  try {
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet("Sheet 1");

    workSheet.getCell("A1").value = "VOTER ID";
    workSheet.getCell("B1").value = "NAME";
    workSheet.getCell("C1").value = "PRECINCT";

    workSheet.getColumn(1).width = 25;
    workSheet.getColumn(2).width = 50;
    workSheet.getColumn(3).width = 25;

    [`A1`, `B1`, `C1`].forEach((cellRef) => {
      const cell = workSheet.getCell(cellRef);

      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      cell.font = {
        bold: true,
        size: 14,
      };
    });

    const voters = await prisma.voter.findMany();

    if (voters.length < 1) {
      throw new Error("Could not export excel file.");
    }

    for (let i = 0; i < voters.length; i++) {
      const column = i + 2;

      workSheet.getCell(`A${column}`).value = voters[i].voterId;
      workSheet.getCell(`B${column}`).value = voters[i].name;
      workSheet.getCell(`C${column}`).value = voters[i].precinct;

      [`A${column}`, `B${column}`, `C${column}`].forEach((cellRef) => {
        const cell = workSheet.getCell(cellRef);

        cell.alignment = {
          horizontal: "left",
          vertical: "middle",
        };

        cell.font = {
          bold: true,
          size: 12,
        };

        if (voters[i].isGiven) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "9E005DFF" },
          };
        }
      });
    }

    const buffer = await workBook.xlsx.writeBuffer();
    const blob = await new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return {
      blob,
      msg: "Successfully exported excel file.",
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return { msg: error.message, success: false, status: 400 };
  }
};
