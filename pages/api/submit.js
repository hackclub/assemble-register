import { registrationsAirtable } from '../../lib/airtable'
import { requiredList } from '../../lib/manifest'

export default async function Submit (req, res) {
    try {
        for (const item in requiredList) {
            try {
                if (!requiredList[item](req.body)) {
                    return res.json({ success: false, error: `You're missing some fields, including ${item}. Please fill in all missing questions.` });
                }
            } catch (err) {
                
            }
        }
    } catch (err) {
        return res.json({ success: false, error: `You're missing some fields. Please fill in all missing questions.` });
    }

    try {
        await registrationsAirtable.create(req.body);
    } catch (err) {
        return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true });
}