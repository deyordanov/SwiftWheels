// pages/api/googleDrive.js
import { google } from "googleapis";
import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false,
    },
};

const KEYFILEPATH = process.env.SERVICE_ACCOUNT_KEY;
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({
    version: "v3",
    auth,
});

export default async function uploadFile(req, res) {
    const form = new formidable.IncomingForm();

    console.log(form);

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        const file = files.file;

        if (!file) {
            res.status(400).send("No file uploaded.");
            return;
        }

        try {
            const response = await drive.files.create({
                requestBody: {
                    name: file.originalFilename, // You can also rename the file if you want
                    mimeType: file.mimetype,
                },
                media: {
                    mimeType: file.mimetype,
                    body: fs.createReadStream(file.filepath),
                },
            });

            // Assuming you want to make the file public and get a public URL
            await drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });

            const result = await drive.files.get({
                fileId: response.data.id,
                fields: "webViewLink, webContentLink",
            });

            res.status(200).json(result.data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    });
}
