import { IsendMail, ISendMail } from "@/domain/use-cases/helpers/send-mail";
import nodemailer from "nodemailer";
import { CONFIG_MAIL } from "@/application/config/environment";

export class SendMail implements ISendMail {
    async send(data: IsendMail.Params): Promise<IsendMail.Result> {
        
        let transporter = nodemailer.createTransport({
            host: CONFIG_MAIL.host,
            port: parseInt(CONFIG_MAIL.port),
            secure: CONFIG_MAIL.secure.toLowerCase() === 'true',
            auth: {
                user: CONFIG_MAIL.username,
                pass: CONFIG_MAIL.password
            }
        });

        let response = await transporter.sendMail(data);
        console.log("Message sent: %s", response.messageId);
        if(response.accepted){
            return { error: response.accepted.join(":"), successful: true ,accessToken: null };
        }else{
            return { error: response.rejected.join(":"), successful: false ,accessToken: null};
        }
    }

}