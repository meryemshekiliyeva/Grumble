import React, { useState } from 'react';
import ComplaintCard from '../components/ComplaintCard';


const complaints = [
	{
		id: 'SKNET001',
		title: 'İnternet Bağlantı Problemləri',
		company: 'CityNet',
		category: 'telekommunikasiya',
		author: 'Orxan Məmmədov',
		date: '9 İyul 2025',
		summary:
			'İnternetim 3 gündür işləmir. Müştəri xidmətləri zənglərimi cavablamır. Bu qəbuledilməzdir!',
		status: 'pending'
	},
	{
		id: 'SKWOLT002',
		title: 'Səhv Yemək Çatdırılması',
		company: 'Wolt',
		category: 'yemək çatdırılması',
		author: 'Aysel Əliyeva',
		date: '8 İyul 2025',
		summary:
			'Pizza sifariş etdim, amma tamamilə fərqli sifariş gətirdilər. Restoran və Wolt bir-birini günahlandırır.',
		status: 'resolved'
	},
	{
		id: 'SKTREN003',
		title: 'Məhsul Çatdırılmadı',
		company: 'Trendyol',
		category: 'e-ticarət',
		author: 'Leyla Hüseynova',
		date: '7 İyul 2025',
		summary:
			'2 həftə əvvəl paltar sifariş etdim, hələ də çatdırılmayıb. İzləmə nömrəsi işləmir.',
		status: 'in_progress'
	},
	{
		id: 'SKBANK004',
		title: 'Bank Kartı Bloklandı',
		company: 'Kapital Bank',
		category: 'bank xidmətləri',
		author: 'Murad Quliyev',
		date: '6 İyul 2025',
		summary: 'Kartım səbəbsiz bloklanıb və dəstək xidməti zəifdir.',
		status: 'pending'
	},
	{
		id: 'SKAZER005',
		title: 'Mobil İnternet Yavaşlığı',
		company: 'Azercell',
		category: 'telekommunikasiya',
		author: 'Nigar Məmmədova',
		date: '5 İyul 2025',
		summary: 'Mobil internet sürəti çox zəifdir, müqaviləyə uyğun deyil.',
		status: 'in_progress'
	},
	{
		id: 'SKBOLT006',
		title: 'Sifariş Gecikməsi',
		company: 'Bolt Food',
		category: 'yemək çatdırılması',
		author: 'Elvin Əliyev',
		date: '4 İyul 2025',
		summary: 'Sifarişim 1 saatdan çox gecikdi və heç bir məlumat verilmədi.',
		status: 'resolved'
	},
	{
		id: 'SKYANGO007',
		title: 'Yanlış Ünvan',
		company: 'Yango',
		category: 'yemək çatdırılması',
		author: 'Səbinə Qasımova',
		date: '3 İyul 2025',
		summary: 'Kuryer yanlış ünvana getdi və yemək soyudu. Pul geri qaytarılmadı.',
		status: 'pending'
	},
	{
		id: 'SKFOOD008',
		title: 'Keyfiyyətsiz Yemək',
		company: 'Fooderos',
		category: 'yemək çatdırılması',
		author: 'Tural Həsənov',
		date: '2 İyul 2025',
		summary: 'Sifariş etdiyim yemək tamamilə keyfiyyətsiz idi. Restoran cavab vermir.',
		status: 'pending'
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
					filteredComplaints.map((complaint) => (
						<ComplaintCard
							key={complaint.id}
							{...complaint}
							complaintId={complaint.id}
							onLike={() => handleLike(complaint.id)}
							onComment={() => handleComment(complaint.id)}
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
