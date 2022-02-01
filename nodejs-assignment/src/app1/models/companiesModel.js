const dynamodb = require("dynamodb");
const Joi = require("joi");

module.exports = dynamodb.define("Loan", {
    hashKey: "id",
    timestamps: true,
    schema: {
        id: dynamodb.types.uuid(),
        btw: Joi.string(),
        plaats: Joi.string(),
        datum_oprichting: Joi.string(),
        vestigingsnummer: Joi.string(),
        postcode: Joi.string(),
        dossiernummer: Joi.string(),
        vestiging: Joi.number(),
        type: Joi.string(),
        non_mailing_indicatie: Joi.bool(),
        omschrijving: Joi.string(),
        statutairehandelsnaam: Joi.array([Joi.string()]),
        rsin: Joi.string(),
        subdossiernummer: Joi.string(),
        updated_at: Joi.string(),
        straat: Joi.string(),
        huisnummer: Joi.string(),
        actief: Joi.bool(),
        bestaandehandelsnaam: Joi.array([Joi.string()]),
        sbi: Joi.array([Joi.number()]),
        soort_onderneming: Joi.string(),
        handelsnaam: Joi.string(),
        _links: Joi.object({
            self: Joi.object({
                href: Joi.string()
            })
        })
    }
});
// btw: 'NL851501230B01',
// plaats: 'Hengelo',
// datum_oprichting: '2012-03-22',
// vestigingsnummer: '000024653926',
// postcode: '7552DD',
// dossiernummer: '54942470',
// vestiging: 24653926,
// type: 'Hoofdvestiging',
// non_mailing_indicatie: false,
// omschrijving: 'Het verstrekken van adviezen en het verlenen van diensten aan ondernemingen, vennootschappen en andere rechtspersonen waarmee de vennootschap in een groep is verbonden en aan derden.',
// statutairehandelsnaam: [ 'Eurus Participatie B.V.' ],
// rsin: '851501230',
// subdossiernummer: '0000',
// updated_at: '2021-03-17',
// straat: 'Woltersweg',
// huisnummer: '44',
// actief: true,
// bestaandehandelsnaam: [ 'Eurus Participatie B.V.' ],
// sbi: [ 70221 ],
// soort_onderneming: 'Besloten vennootschap (B.V.)',
// handelsnaam: 'Eurus Participatie B.V.',
// _links: {
//   self: {
//     href: '/openkvk/hoofdvestiging-54942470-0000-eurus-participatie-bv'
//   }
// }
// }
