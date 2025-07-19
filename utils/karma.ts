import axios from "axios";
require("dotenv").config();

import type { KarmaApiResponse } from "../interfaces/index";

async function isBlacklisted(email: string): Promise<boolean> {
    try {
        const response = await axios.get(`https://adjutor.lendsqr.com/v2/verification/karma/${email}`, {
            headers: {
                Authorization: `Bearer ${process.env.KARMA_API_KEY}`,
            },
        }) as { data: KarmaApiResponse };

        return response.data?.blacklisted || false;
    } catch (error: any) {
        console.error("Karma API error:", error?.response?.data || error.message);
        throw new Error("Failed to verify blacklist status.");
    }
}

export default isBlacklisted;
