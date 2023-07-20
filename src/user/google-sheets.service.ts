import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { User } from '../schema/user.schema';
import * as creds from '../config/credentials.json'


@Injectable()
  export class GoogleSheetsService {
    private readonly spreadsheetId = '1SaUSyKrdXBz3TN7rRdgdqmqJzDIr60FzwDh6wjjUasg';
    private doc: GoogleSpreadsheet;
    private sheet: GoogleSpreadsheetRow[];  
  
    constructor() {
      this.doc = new GoogleSpreadsheet(this.spreadsheetId);
    }
  
// POPULATE USER TO GOOGLE SHEET (CREATE / READ / UPDATE)

    async populateData(users: User[]): Promise<void> {

      // Authenticate with service account credentials
      await this.doc.useServiceAccountAuth(creds);
  
      // Load the Google Sheet
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsByIndex[0];
  
      // Clear existing data in the sheet
      await sheet.clear();
  
      // Set header row
      const headerRow = ['id', 'name', 'age', 'email', 'phone', 'postal_code'];
      await sheet.setHeaderRow(headerRow);
  
      // Prepare data rows
      const dataRows: GoogleSpreadsheetRow[] = users.map(user => [
        user.id.toString(),
        user.name,
        user.age.toString(),
        user.email,
        user.phone.toString(),
        user.postal_code,
      ]);
  
      // Append data rows to the sheet
     return await sheet.addRows(dataRows) 
  
    }   
  
// DELETE USER FROM GOOGLE SHEET

    async removeData(id: number): Promise<void> {

      // Authenticate with service account credentials
      await this.doc.useServiceAccountAuth(creds);
  
      // Load the Google Sheet
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsByIndex[0];
  
      // Find the row to delete based on the user ID
      const rows = await sheet.getRows();
      const rowToDelete = rows.find(row => row.id === id.toString());
  
      if (rowToDelete) {
        // Delete the row from the sheet
        await rowToDelete.delete();
      }
    }
  }
