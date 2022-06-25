import { registrationsAirtable } from '../../lib/airtable'

export default async function Submit (req, res) {
    try {
        await registrationsAirtable.create(req.body);
    } catch (err) {
        return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true });
}