import React, { useState } from 'react';
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
	const [search, setSearch] = useState('');

	const filteredComplaints = complaints.filter(
		(c) =>
			c.title.toLowerCase().includes(search.toLowerCase()) ||
			c.company.toLowerCase().includes(search.toLowerCase()) ||
			c.author.toLowerCase().includes(search.toLowerCase()) ||
			c.summary.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="container max-w-screen-2xl py-8">
			<h1 className="text-3xl font-bold tracking-tight text-center">
				Bütün Şikayətlər
			</h1>
			<p className="text-center text-muted-foreground mt-2 mb-8">
				Son şikayətlər lentini izləyin və başqalarının təcrübələrini oxuyun.
			</p>
			<div className="flex justify-center mb-8">
				<input
					type="text"
					placeholder="Axtar: başlıq, şirkət, müəllif, məzmun..."
					className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredComplaints.length > 0 ? (
					filteredComplaints.map((complaint, idx) => (
						<ComplaintCard key={idx} {...complaint} />
					))
				) : (
					<div className="col-span-full text-center text-muted-foreground py-12">
						Heç bir şikayət tapılmadı.
					</div>
				)}
			</div>
		</div>
	);
};

export default Complaints;
