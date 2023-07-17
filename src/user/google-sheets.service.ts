import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { User } from '../schema/user.schema';
import * as creds from '../config/credentials.json'
import * as fs from 'fs';
import * as XLSX from 'xlsx';

@Injectable()
  export class GoogleSheetsService {
    private readonly spreadsheetId = '1SaUSyKrdXBz3TN7rRdgdqmqJzDIr60FzwDh6wjjUasg';
    private doc: GoogleSpreadsheet;
    private sheet: GoogleSpreadsheetRow[];

    
  
    constructor() {
      this.doc = new GoogleSpreadsheet(this.spreadsheetId);
    }
  
    // SHOW ALL USERS/ USER-------------------------------------

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
      const dataRows = users.map(user => [
        user.id.toString(),
        user.name,
        user.age.toString(),
        user.email,
        user.phone,
        user.postal_code,
      ]);
  
      // Append data rows to the sheet
     return await sheet.addRows(dataRows) 
  
    }

    
  
//   For Removing Row in Google Sheet

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

// For Updating data in google Sheet

  async authenticate(): Promise<void> {
    // Implement authentication logic with service account credentials
    // Initialize the GoogleSpreadsheet instance
  }

  async loadSpreadsheet(): Promise<void> {
    // Load the Google Sheet by ID or URL
    await this.doc.loadInfo();
    // Access the sheet by index or name
    this.sheet = this.doc.sheetsByIndex[0].getRows();
  }

  async findRowByUserId(userId: number): Promise<GoogleSpreadsheetRow | undefined> {
    // Find the row in the Google Sheet based on the user ID
    const row = this.sheet.find((row) => Number(row.userId) === userId);
    return row;
  }

  async updateRowData(row: GoogleSpreadsheetRow, user: User): Promise<void> {
    // Update the row data with the user object values
    row.name = user.name;
    row.age = user.age.toString();
    row.email = user.email;
    row.phone = user.phone;
    row.postal_code = user.postal_code;
    await row.save();
  }

  async deleteRow(row: GoogleSpreadsheetRow): Promise<void> {
    // Delete the row from the Google Sheet
    await row.delete();
  }

  async saveChanges(): Promise<void> {
    // Save the changes made in the Google Sheet
    await this.doc.saveUpdatedCells();
  }
}
