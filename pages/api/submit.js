import { registrationsAirtable } from '../../lib/airtable'
import { requiredList } from '../../lib/manifest'

export default async function Submit (req, res) {
    const missing = [];
    try {
        for (const item in requiredList) {
            try {
                if (!requiredList[item](req.body)) {
                    missing.push(item);
                }
            } catch (err) {

            }
        }
    } catch (err) {
        return res.json({ success: false, error: `You're missing some fields. Please fill in all missing questions.` });
    }

    if (missing.length > 5) return res.json({ success: false, error: `You're missing some fields. Please fill in all missing questions.` });
    if (missing.length) return res.json({ success: false, error: `You are missing some fields: ${missing.map(item => `"${item}"`).join(", ")}` });

    try {
        await registrationsAirtable.create(req.body);
    } catch (err) {
        return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true });
}