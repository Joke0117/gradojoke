import sgMail from '@sendgrid/mail';

const SG_API_KEY = process.env.SENDGRID_API_KEY;
// Usamos el dominio que mencionaste para enviar
const FROM_EMAIL = 'invitaciones@josegrado.online'; 
const ADMIN_EMAIL = 'martinezrodelojose@gmail.com';

if (SG_API_KEY) {
  sgMail.setApiKey(SG_API_KEY);
}

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { nombre, apellido, celular, email } = data;
    const fullName = `${nombre} ${apellido}`;

    // 1. Plantilla para el INVITADO
    const guestHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0906;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0906;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0f0d09;border:1px solid #c9a84c;border-radius:16px;overflow:hidden;">
        <tr><td style="height:4px;background:linear-gradient(90deg,#7a5c1e,#e8c96a,#c9a84c,#e8c96a,#7a5c1e);"></td></tr>
        <tr><td align="center" style="padding:44px 40px 28px;background:#0f0d09;">
          <div style="margin-bottom:20px;">
            <img src="https://josegrado.online/cap-gold.png?v=3" width="52" height="40" alt="Grado" style="display:block;margin:0 auto;object-fit:contain;border:none;outline:none;text-decoration:none;" />
          </div>
          <div style="font-size:10px;letter-spacing:7px;color:#c9a84c;text-transform:uppercase;margin-bottom:18px;">Graduación · 29 Mayo 2026</div>
          <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:6px;">
            <tr>
              <td style="padding-right:10px;vertical-align:middle;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" stroke="#c9a84c" stroke-width="1.5"/>
                  <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#e8c96a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </td>
              <td style="vertical-align:middle;">
                <span style="font-size:28px;font-weight:700;letter-spacing:5px;color:#e8c96a;font-family:'Georgia',serif;">CONFIRMADO</span>
              </td>
            </tr>
          </table>
          <div style="width:80px;height:1px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);margin:22px auto 0;"></div>
        </td></tr>
        <tr><td style="padding:32px 44px;">
          <p style="color:#c9a84c;font-size:10px;letter-spacing:5px;text-transform:uppercase;margin:0 0 6px;">Hola ${fullName}</p>
          <p style="color:#f0e6c8;font-size:26px;margin:0 0 8px;font-style:italic;font-weight:400;">Tu asistencia ha sido registrada</p>
          <p style="color:#8a7030;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:'Georgia',serif;">Nos alegra mucho que nos acompañes en este día tan especial. Aquí tienes los detalles del evento:</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(201,168,76,0.3);border-radius:10px;overflow:hidden;margin-bottom:28px;">
            <tr style="background:rgba(201,168,76,0.05);">
              <td style="padding:22px 20px;border-bottom:1px solid rgba(201,168,76,0.12);">
                <span style="display:block;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Evento</span>
                <span style="color:#f0e6c8;font-size:16px;font-family:'Georgia',serif;">Graduación de José Ángel Martínez</span>
              </td>
            </tr>
            <tr style="background:rgba(201,168,76,0.03);">
              <td style="padding:22px 20px;border-bottom:1px solid rgba(201,168,76,0.12);">
                <span style="display:block;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Fecha</span>
                <span style="color:#f0e6c8;font-size:16px;font-family:'Georgia',serif;">29 de mayo de 2026 · 3:00 PM</span>
              </td>
            </tr>
            <tr style="background:rgba(201,168,76,0.05);">
              <td style="padding:22px 20px;border-bottom:1px solid rgba(201,168,76,0.12);">
                <span style="display:block;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Ceremonia de Grado</span>
                <span style="color:#f0e6c8;font-size:15px;font-family:'Georgia',serif;">Universidad de la Costa — CUC</span>
              </td>
            </tr>
            <tr style="background:rgba(201,168,76,0.03);">
              <td style="padding:22px 20px;">
                <span style="display:block;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Recepción</span>
                <span style="color:#f0e6c8;font-size:15px;font-family:'Georgia',serif;">Restaurante San Nicolás · 7:00 PM</span>
                <a href="https://maps.google.com/?q=Cra+56+%23+72+-+128,+Barranquilla" style="display:block;color:#8a7030;font-size:12px;margin-top:6px;font-family:Arial,sans-serif;text-decoration:none;">Cra 56 # 72 - 128, Barranquilla</a>
              </td>
            </tr>
          </table>
          <p style="color:#e8c96a;font-size:14px;line-height:1.9;margin:0;font-family:'Georgia',serif;font-style:italic;">¡Te esperamos con mucho gusto!</p>
        </td></tr>
        <tr><td style="padding:0 44px;"><div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.35),transparent);"></div></td></tr>
        <tr><td align="center" style="padding:28px 44px 36px;">
          <div style="font-size:10px;color:#4a3a12;letter-spacing:6px;margin-bottom:12px;">&#9670; &nbsp; &#9670; &nbsp; &#9670;</div>
          <p style="color:#6b5520;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0 0 6px;font-family:Arial,sans-serif;">Con gratitud</p>
          <p style="color:#c9a84c;font-size:19px;letter-spacing:2px;margin:0 0 6px;font-family:'Georgia',serif;">José Ángel Martínez</p>
          <p style="color:#3d2e0a;font-size:10px;letter-spacing:3px;margin:0;text-transform:uppercase;font-family:Arial,sans-serif;">Ingeniería de Sistemas · CUC · 2026</p>
        </td></tr>
        <tr><td style="height:4px;background:linear-gradient(90deg,#7a5c1e,#e8c96a,#c9a84c,#e8c96a,#7a5c1e);"></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `;

    // 2. Plantilla para el ADMIN
    const adminHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0906;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0906;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#0f0d09;border:1px solid #c9a84c;border-radius:16px;overflow:hidden;">
        <tr><td style="height:4px;background:linear-gradient(90deg,#7a5c1e,#e8c96a,#c9a84c,#e8c96a,#7a5c1e);"></td></tr>
        <tr><td align="center" style="padding:44px 40px 28px;background:#0f0d09;">
          <div style="margin-bottom:20px;">
            <img src="https://josegrado.online/cap-gold.png?v=3" width="52" height="40" alt="Grado" style="display:block;margin:0 auto;object-fit:contain;border:none;outline:none;text-decoration:none;" />
          </div>
          <div style="font-size:10px;letter-spacing:7px;color:#c9a84c;text-transform:uppercase;margin-bottom:18px;">Notificación · Admin</div>
          <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:6px;">
            <tr>
              <td style="padding-right:10px;vertical-align:middle;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" stroke="#c9a84c" stroke-width="1.5"/>
                  <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#e8c96a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </td>
              <td style="vertical-align:middle;">
                <span style="font-size:26px;font-weight:700;letter-spacing:5px;color:#e8c96a;font-family:'Georgia',serif;">NUEVA RSVP</span>
              </td>
            </tr>
          </table>
          <div style="width:80px;height:1px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);margin:22px auto 0;"></div>
        </td></tr>
        <tr><td style="padding:32px 44px;">
          <p style="color:#c9a84c;font-size:10px;letter-spacing:5px;text-transform:uppercase;margin:0 0 6px;">Graduación · 29 Mayo 2026</p>
          <p style="color:#f0e6c8;font-size:24px;margin:0 0 8px;font-style:italic;font-weight:400;">Ha confirmado su asistencia</p>
          <p style="color:#8a7030;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:'Georgia',serif;">Un nuevo invitado ha completado el formulario de confirmación.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(201,168,76,0.3);border-radius:10px;overflow:hidden;margin-bottom:28px;">
            <tr style="background:rgba(201,168,76,0.05);">
              <td style="padding:22px 20px;border-bottom:1px solid rgba(201,168,76,0.12);">
                <span style="display:block;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Nombre</span>
                <span style="color:#f0e6c8;font-size:18px;font-family:'Georgia',serif;font-weight:600;">${fullName}</span>
              </td>
            </tr>
            <tr style="background:rgba(201,168,76,0.03);">
              <td style="padding:22px 20px;border-bottom:1px solid rgba(201,168,76,0.12);">
                <span style="display:block;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Celular</span>
                <a href="tel:${celular}" style="color:#f0e6c8;font-size:16px;font-family:'Georgia',serif;text-decoration:none;">${celular}</a>
              </td>
            </tr>
            <tr style="background:rgba(201,168,76,0.05);">
              <td style="padding:22px 20px;">
                <span style="display:block;font-size:9px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;margin-bottom:6px;">Correo</span>
                <a href="mailto:${email}" style="color:#f0e6c8;font-size:15px;font-family:Arial,sans-serif;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>
          <p style="color:#e8c96a;font-size:13px;line-height:1.9;margin:0;font-family:'Georgia',serif;font-style:italic;">Puedes responder directamente a este correo para contactar al invitado.</p>
        </td></tr>
        <tr><td style="padding:0 44px;"><div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.35),transparent);"></div></td></tr>
        <tr><td align="center" style="padding:28px 44px 36px;">
          <div style="font-size:10px;color:#4a3a12;letter-spacing:6px;margin-bottom:12px;">&#9670; &nbsp; &#9670; &nbsp; &#9670;</div>
          <p style="color:#6b5520;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0 0 6px;font-family:Arial,sans-serif;">Sistema automático</p>
          <p style="color:#c9a84c;font-size:17px;letter-spacing:2px;margin:0 0 6px;font-family:'Georgia',serif;">José Ángel Martínez</p>
          <p style="color:#3d2e0a;font-size:10px;letter-spacing:3px;margin:0;text-transform:uppercase;font-family:Arial,sans-serif;">Ingeniería de Sistemas · CUC · 2026</p>
        </td></tr>
        <tr><td style="height:4px;background:linear-gradient(90deg,#7a5c1e,#e8c96a,#c9a84c,#e8c96a,#7a5c1e);"></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `;

    const msgGuest = {
      to: email,
      from: { email: FROM_EMAIL, name: 'José Ángel Martínez' },
      subject: `Asistencia confirmada — ${fullName}`,
      html: guestHtml
    };

    const msgAdmin = {
      to: ADMIN_EMAIL,
      from: { email: FROM_EMAIL, name: 'RSVP Grado' },
      subject: `Nueva confirmación — ${fullName}`,
      html: adminHtml,
      replyTo: email
    };

    // Si SendGrid está configurado en Netlify, envía
    if (SG_API_KEY) {
      await Promise.all([
        sgMail.send(msgGuest),
        sgMail.send(msgAdmin)
      ]);
      console.log('Correos enviados via SendGrid exitosamente');
    } else {
      console.warn("⚠️ SENDGRID_API_KEY no existe en el entorno. (No se enviaron los correos).");
    }

    return { 
      statusCode: 200, 
      body: JSON.stringify({ success: true, message: "RSVP processada" }) 
    };

  } catch (error: any) {
    console.error("Error en Netlify Function (send-rsvp):", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Error enviando el correo' }) 
    };
  }
};
