import { jsPDF } from 'jspdf'

// 1) CV نموذج
{
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.setFontSize(18); doc.text('Yassine B. - Technicien', 14, 18)
  doc.setFontSize(11); doc.text('Casablanca, Maroc | 06 00 00 00 00 | yassine.exemple@mail.com', 14, 26)
  doc.setFontSize(13); doc.text('Profil', 14, 36)
  doc.setFontSize(10); doc.text('Technicien avec 4 ans d\'experience en maintenance et support. Disponible immediatement.', 14, 42)
  doc.setFontSize(13); doc.text('Experiences', 14, 52)
  doc.setFontSize(10)
  doc.text('2022-2026 : Technicien support - Societe Exemple, Casablanca', 14, 58)
  doc.text('2020-2022 : Stagiaire maintenance - Atelier Exemple', 14, 64)
  doc.setFontSize(13); doc.text('Formation', 14, 74)
  doc.setFontSize(10); doc.text('Bac +2 - OFPPT (exemple)', 14, 80)
  doc.setFontSize(9); doc.text('Modele de demonstration - Khadamat ARRAKHAE', 14, 285)
  doc.save('public/samples/cv-exemple.pdf')
  console.log('saved cv-exemple.pdf')
}

// 2) فاتورة نموذج
{
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.setFontSize(16); doc.text('Facture - FAC-2026-001', 105, 15, { align: 'center' })
  doc.setFontSize(10)
  doc.text('Emetteur: Cafe Al Baraka (exemple) | ICE: 000000000', 10, 25)
  doc.text('Client: Client Exemple | Tel: 06 00 00 00 00', 10, 31)
  doc.text('Designation: Amenagement vitrine + carte QR', 10, 41)
  doc.text('Qte: 1  |  PU HT: 1500.00 MAD  |  TVA: 20%', 10, 47)
  doc.text('Total HT: 1500.00 MAD', 150, 57)
  doc.text('TVA: 300.00 MAD', 150, 63)
  doc.setFontSize(13); doc.text('TTC: 1800.00 MAD', 150, 70)
  doc.setFontSize(9); doc.text('Modele de demonstration - document sans valeur.', 10, 285)
  doc.save('public/samples/facture-exemple.pdf')
  console.log('saved facture-exemple.pdf')
}
