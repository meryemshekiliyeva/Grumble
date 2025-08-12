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

	const handleLike = (complaintId) => {
		console.log('Liked complaint:', complaintId);
		// TODO: Implement like functionality with backend
	};

	const handleComment = (complaintId) => {
		console.log('Comment on complaint:', complaintId);
		// TODO: Implement comment functionality with backend
	};

	const filteredComplaints = complaints.filter(
		(c) =>
			c.title.toLowerCase().includes(search.toLowerCase()) ||
			c.company.toLowerCase().includes(search.toLowerCase()) ||
			c.author.toLowerCase().includes(search.toLowerCase()) ||
			c.summary.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="container max-w-screen-2xl py-8">
			{/* Prettier header section */}
			<div className="flex flex-col items-center justify-center mb-10 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl py-8 shadow">
				<div className="flex items-center gap-3 mb-3">
					<span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/80 text-white text-3xl shadow">
						{/* Example icon: emoji */}
						💬
					</span>
					<h1 className="text-4xl font-extrabold tracking-tight text-primary drop-shadow">
						Bütün Şikayətlər
					</h1>
				</div>
				<p className="text-lg text-muted-foreground max-w-xl text-center">
					Ən son şikayətləri izləyin və başqalarının təcrübələrini oxuyun. Sizin səsiniz önəmlidir!
				</p>
			</div>
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
						<ComplaintCard
							key={idx}
							{...complaint}
							onLike={() => handleLike(idx)}
							onComment={() => handleComment(idx)}
						/>
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
