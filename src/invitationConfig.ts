export type Celebration = {
 id: 'music' | 'reception'; shortName: string; title: string; subtitle: string; dateLabel: string; timeLabel: string;
 venue: string; address: string; supportingLine: string; start: string; calendarTitle: string;
 image: string; scene: 'lanterns' | 'fire' | 'candlelight'; mapUrl: string; phereTime?: string;
};
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Amritam+Palace+Jodhpur';
const brideParents = 'D/O Smt. Neelam Ji & Late Shri Rakesh Ji Dhariwal';
const groomParents = 'S/O Smt. Kanta Devi & Shri Moti Lal Chopra';
export const invitationConfig = {
 couple: { first: 'Rishabh', second: 'Khushi', firstParents: groomParents, secondParents: brideParents,
 brideParents: groomParents, groomParents: brideParents,
 groomGrandparents: 'Granddaughter of Smt. Pyari Devi & Late Shri Parasmal Sa Dhariwal' },
 weddingLabel: '26 November 2026 - Jodhpur', countdownTarget: '2026-11-26T00:00:00+05:30',
 memorialLine: 'With the blessings of Mangalmay Bhagwan',
 invitationLine: 'Smt. Mohini Devi & Shri Parasmal Chopra cordially solicit your gracious presence and blessings on the auspicious occasion of the wedding ceremony of their beloved grandson.',
 blessingLine: 'Please join us with your family & bless the couple.',
 homeAddress: 'Jodhpur, Rajasthan', hosts: 'The Chopra & Dhariwal families',
 rsvp: 'The Chopra family', wishesFrom: 'All Relatives & Friends',
 monogram: '/assets/rk-monogram-transparent.png', artwork: '/assets/reception-filler.png',
 venue: { name: 'Amritam Palace', address: 'Jodhpur, Rajasthan', mapUrl },
 contacts: ['9413319323', '9414920293', '8619315493'],
 optional: { travel: '', stay: '', contact: '', musicUrl: '/assets/kudmayi.mp3', whatsappHostNumber: '' },
 celebrations: [
 { id: 'music', shortName: 'An Evening of Music', subtitle: 'An Enchanting Musical Celebration', title: 'An Evening of Music - An Enchanting Musical Celebration',
 dateLabel: 'Wednesday, 25 November 2026', timeLabel: '7:30 p.m. onwards',
 venue: 'The Lawn - Amritam Palace', address: 'Jodhpur, Rajasthan',
 supportingLine: 'An evening filled with music, joy and wonderful memories. Followed by dinner. Please reserve pre-sunset dinner.',
 start: '2026-11-25T19:30:00+05:30', calendarTitle: 'Rishabh & Khushi - An Evening of Music',
 image: '/assets/music-filler.png', scene: 'lanterns', mapUrl },
 { id: 'reception', shortName: 'Reception & Dinner', subtitle: 'An Evening of Elegance & Celebration', title: 'Reception & Dinner - An Evening of Elegance & Celebration',
 dateLabel: 'Thursday, 26 November 2026', timeLabel: '7:30 p.m. onwards',
 venue: 'The Lawn - Amritam Palace', address: 'Jodhpur, Rajasthan',
 supportingLine: 'An enchanting evening of togetherness, heartfelt wishes and joyful celebrations. Please reserve pre-sunset dinner.',
 start: '2026-11-26T19:30:00+05:30', calendarTitle: 'Rishabh & Khushi - Reception & Dinner',
 image: '/assets/reception-filler.png', scene: 'candlelight', mapUrl },
 ] satisfies Celebration[],
 calendar: { timezone: 'Asia/Kolkata' },
} as const;
