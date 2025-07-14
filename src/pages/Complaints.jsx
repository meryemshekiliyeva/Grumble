import React from 'react';
import ComplaintCard from '../components/ComplaintCard';


const complaints = [
	{
		title: 'İnternet Bağlantı Problemləri',
		company: 'CityNet',
		author: 'Orxan Məmmədov',
		date: '9 İyul 2025',
		summary:
			'İnternetim 3 gündür işləmir. Müştəri xidmətləri zənglərimi cavablamır. Bu qəbuledilməzdir!',
	},
	{
		title: 'Səhv Yemək Çatdırılması',
		company: 'Wolt',
		author: 'Aysel Əliyeva',
		date: '8 İyul 2025',
		summary:
			'Pizza sifariş etdim, amma tamamilə fərqli sifariş gətirdilər. Restoran və Wolt bir-birini günahlandırır.',
	},
	{
		title: 'Məhsul Çatdırılmadı',
		company: 'Trendyol',
		author: 'Leyla Hüseynova',
		date: '7 İyul 2025',
		summary:
			'2 həftə əvvəl paltar sifariş etdim, hələ də çatdırılmayıb. İzləmə nömrəsi işləmir.',
	},
	{
		title: 'Bank Kartı Bloklandı',
		company: 'Kapital Bank',
		author: 'Murad Quliyev',
		date: '6 İyul 2025',
		summary: 'Kartım səbəbsiz bloklanıb və dəstək xidməti zəifdir.',
	},
	{
		title: 'Mobil İnternet Yavaşlığı',
		company: 'Azercell',
		author: 'Nigar Məmmədova',
		date: '5 İyul 2025',
		summary: 'Mobil internet sürəti çox zəifdir, müqaviləyə uyğun deyil.',
	},
	{
		title: 'Sifariş Gecikməsi',
		company: 'Bolt Food',
		author: 'Elvin Əliyev',
		date: '4 İyul 2025',
		summary: 'Sifarişim 1 saatdan çox gecikdi və heç bir məlumat verilmədi.',
	},
];

const Complaints = () => {
	return (
		<div className="container max-w-screen-2xl py-8">
			<h1 className="text-3xl font-bold tracking-tight text-center">
				Bütün Şikayətlər
			</h1>
			<p className="text-center text-muted-foreground mt-2 mb-8">
				Son şikayətlər lentini izləyin və başqalarının təcrübələrini oxuyun.
			</p>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{complaints.map((complaint, idx) => (
					<ComplaintCard key={idx} {...complaint} />
				))}
			</div>
		</div>
	);
};

export default Complaints;