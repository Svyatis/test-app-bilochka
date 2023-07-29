const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bilochka.lviv@gmail.com',
        pass: 'nuts@fruits150690'
    }
});

exports.sendMail = functions.https.onRequest((req: any, res: any) => {
    cors(req, res, () => {
      
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Bilochka Nuts&Fruits <bilochka.lviv@gmail.com>',
            to: dest,
            subject: 'Test Image',
            html: `sdfsd`
        };
  
        return transporter.sendMail(mailOptions, (erro: any, info: any) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send(req.body);
        });
    });    
});

exports.sendMailOnDatabaseCreate = functions.database.ref('/orders/{date}/{objId}').onCreate((snapshot: any, context: any) => {
      
    const dest = 'roksolana_chepil@ukr.net';
    let string = '<ul>';

    snapshot.val().items.forEach((item: any) => {
        string += '<li>' + item.label + ' - ' + item.amount + ' - ' + item.cost + ' - ' + item.cost * item.amount + '</li>';
    });

    string += '</ul>';

    const mailOptions = {
        from: 'Bilochka Nuts&Fruits <bilochka.lviv@gmail.com>',
        to: dest,
        subject: snapshot.val().email,
        html: `<h1>Замовлення ${context.params.date} (${context.params.objId})</h1>
        <p>
            <b>Ім'я: </b>${snapshot.val().name}<br>
            <b>Емейл: </b>${snapshot.val().email}<br>
            <b>Телефон: </b>${snapshot.val().phone}<br>
            ${string}<br>
            <b>Загальна сума: </b>${snapshot.val().totalCost}<br>
        </p>`
    };

    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
        if(erro){
            console.log('some issue with mails');
            console.log(erro);
            return;
        }
        console.log('Відправлено!');
    });
});