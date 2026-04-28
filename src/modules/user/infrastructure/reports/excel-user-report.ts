import ExcelJS from "exceljs";

export class ExcelUserReport {

    async generate(data: any[]): Promise<Buffer> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        worksheet.columns = [
            { header: "Name", key: "name", width: 10 },
            { header: "Email", key: "email", width: 25 },
            { header: "Role", key: "role", width: 30 },
            { header: "Group", key: "group", width: 30 },
            { header: "Report to", key: "manager", width: 30 },
            { header: "Created Date", key: "createdAt", width: 30 },
        ];

        data.forEach(row => worksheet.addRow(row));

        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
}