import * as fs from 'fs';
import * as path from 'path';

interface TestCredentials {
    username: string;
    password: string;
    expectedError?: string;
    description: string;
}

interface TestData {
    validCredentials: TestCredentials[];
    invalidCredentials: TestCredentials[];
}

export class DataUtils {
    private static testData: TestData;

    static loadTestData(): TestData {
        if (!this.testData) {
            const dataPath = path.join(__dirname, '../data/testData.json');
            const rawData = fs.readFileSync(dataPath, 'utf-8');
            this.testData = JSON.parse(rawData);
        }
        return this.testData;
    }

    static getValidCredentials(): TestCredentials[] {
        return this.loadTestData().validCredentials;
    }

    static getInvalidCredentials(): TestCredentials[] {
        return this.loadTestData().invalidCredentials;
    }
} 