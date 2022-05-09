import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user:"e763e11683289a",
      pass: "7f2f35568cdee1",
    }
  });
  

