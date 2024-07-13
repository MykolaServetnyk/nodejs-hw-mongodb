import path from 'node:path';
import 'dotenv/config';
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const SMTP = {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM,
};
