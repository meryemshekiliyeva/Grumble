import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard';

const Companies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const companies = [
    // Telekommunikasiya
    {
      name: 'AT&T',
      category: 'Telekom',
      complaintCount: 247,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AT%26T_logo_2016.svg/200px-AT%26T_logo_2016.svg.png',
      bgColor: '#0066CC',
      companyId: 'att'
    },
    {
      name: 'Vodafone',
      category: 'Telekom',
      complaintCount: 128,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/200px-Vodafone_icon.svg.png',
      bgColor: '#E60000',
      companyId: 'vodafone'
    },
    {
      name: 'T-Mobile',
      category: 'Telekom',
      complaintCount: 112,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/T-Mobile_logo.svg/200px-T-Mobile_logo.svg.png',
      bgColor: '#E20074',
      companyId: 't-mobile'
    },
    // Bank və Maliyyə
    {
      name: 'JPMorgan Chase',
      category: 'Bank',
      complaintCount: 189,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/JPMorgan_Chase_logo.svg/200px-JPMorgan_Chase_logo.svg.png',
      bgColor: '#0066CC',
      companyId: 'jpmorgan-chase'
    },
    {
      name: 'HSBC',
      category: 'Bank',
      complaintCount: 165,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/200px-HSBC_logo_%282018%29.svg.png',
      bgColor: '#DB0011',
      companyId: 'hsbc'
    },
    {
      name: 'Goldman Sachs',
      category: 'Bank',
      complaintCount: 95,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/200px-Goldman_Sachs.svg.png',
      bgColor: '#1E3A8A',
      companyId: 'goldman-sachs'
    },
    // Yemək Çatdırılması
    {
      name: 'Uber Eats',
      category: 'Yemək Çatdırılması',
      complaintCount: 156,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/200px-Uber_logo_2018.png',
      bgColor: '#000000',
      companyId: 'uber-eats'
    },
    {
      name: 'DoorDash',
      category: 'Yemək Çatdırılması',
      complaintCount: 89,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/DoorDash_logo.svg/200px-DoorDash_logo.svg.png',
      bgColor: '#FF3008',
      companyId: 'doordash'
    },
    {
      name: 'Deliveroo',
      category: 'Yemək Çatdırılması',
      complaintCount: 67,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Deliveroo_logo.svg/200px-Deliveroo_logo.svg.png',
      bgColor: '#00CCBC',
      companyId: 'deliveroo'
    },
    // Havayolu
    {
      name: 'Emirates',
      category: 'Havayolu',
      complaintCount: 134,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
      bgColor: '#FF0000',
      companyId: 'emirates'
    },
    {
      name: 'Lufthansa',
      category: 'Havayolu',
      complaintCount: 89,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/200px-Lufthansa_Logo_2018.svg.png',
      bgColor: '#F9BA00',
      companyId: 'lufthansa'
    },
    {
      name: 'Delta Air Lines',
      category: 'Havayolu',
      complaintCount: 32,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/200px-Delta_logo.svg.png',
      bgColor: '#003366',
      companyId: 'delta-air-lines'
    },
    // Kommunal Xidmətlər
    {
      name: 'EDF Energy',
      category: 'Kommunal',
      complaintCount: 98,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/EDF_logo.svg/200px-EDF_logo.svg.png',
      bgColor: '#FF6600',
      companyId: 'edf-energy'
    },
    {
      name: 'National Grid',
      category: 'Kommunal',
      complaintCount: 87,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/National_Grid_logo.svg/200px-National_Grid_logo.svg.png',
      bgColor: '#0066CC',
      companyId: 'national-grid'
    },
    {
      name: 'Veolia',
      category: 'Kommunal',
      complaintCount: 65,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Veolia_logo.svg/200px-Veolia_logo.svg.png',
      bgColor: '#00A651',
      companyId: 'veolia'
    },
    // Sığorta
    {
      name: 'Allianz',
      category: 'Sığorta',
      complaintCount: 87,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Allianz_logo.svg/200px-Allianz_logo.svg.png',
      bgColor: '#0066CC',
      companyId: 'allianz'
    },
    {
      name: 'AXA',
      category: 'Sığorta',
      complaintCount: 65,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/AXA_Logo.svg/200px-AXA_Logo.svg.png',
      bgColor: '#00008F',
      companyId: 'axa'
    },
    {
      name: 'Prudential',
      category: 'Sığorta',
      complaintCount: 54,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Prudential_plc_logo.svg/200px-Prudential_plc_logo.svg.png',
      bgColor: '#ED1C24',
      companyId: 'prudential'
    },
    // E-ticarət
    {
      name: 'Amazon',
      category: 'E-ticarət',
      complaintCount: 156,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
      bgColor: '#FF9900',
      companyId: 'amazon'
    },
    {
      name: 'Alibaba',
      category: 'E-ticarət',
      complaintCount: 98,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alibaba_Group_Holding_Limited_Logo.svg/200px-Alibaba_Group_Holding_Limited_Logo.svg.png',
      bgColor: '#FF6A00',
      companyId: 'alibaba'
    },
    {
      name: 'eBay',
      category: 'E-ticarət',
      complaintCount: 76,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/200px-EBay_logo.svg.png',
      bgColor: '#E53238',
      companyId: 'ebay'
    }
  ];
    {
      name: 'AT&T',
      category: 'Telekom',
      complaintCount: 247,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AT%26T_logo_2016.svg/200px-AT%26T_logo_2016.svg.png',
      bgColor: '#0066CC'
    },
    {
      name: 'JPMorgan Chase',
      category: 'Bank',
      complaintCount: 189,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/JPMorgan_Chase_logo.svg/200px-JPMorgan_Chase_logo.svg.png',
      bgColor: '#0066CC'
    },
    {
      name: 'Bolt Food',
      category: 'Yemək Çatdırılması',
      complaintCount: 156,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEUqnGQlm2IgmV9psot5uZYIlVgAlVZLp3gvnmfg7ub////4/PpVq35yt5LZ6+GEvp6/3czz+fam0LnT59w6oW2Zya9broIVmV4Wml6y1cJDpHKkz7cAkE38/v1+u5nj8OnI4dOQxaitsN5vAAAA10lEQVR4AWIYVgBAFlkYMAwCQBAn/bi77b9k0erhHA5lhu+ed40LIbh8dzClk1iXDxjSjEaXA4lUzMsCziormEklQKu6kUG2XQ8MlEkuktHKCZgX6mUxNEA2DimAdTNy3IFCfiy7ETjK41/i6IEm33EKJ6uBxj2XGtcMbFuFNHdyjQcqeJ7iuoG5BB7CHajZgnTkoy+F3bMGqtHKE5ZeMl3bUpUAKcOB6KIN42hqSg/TSDutydjlHbFQh9uhOjtq2/Y3/r4HuGPnH2M5M0qewwWYxIFyAwsA0BIOXVXi6OMAAAAASUVORK5CYII=',
      bgColor: '#34D186'
    },
    {
      name: 'AZAL',
      category: 'Havayolu',
      complaintCount: 134,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADGklEQVRIie2WS08TURTH772d1jK0tIBUFMKjkQRcKMZEIwomhhgXxpW68xMY4wcwujNGNxpjfMREWWAkkfCIKCBFSFAsKrQCRUhoLNCWZ9uZtkPndee6QBvCTGtVWGj87+6cM/9fzrlzTgYSQsBWCm2p+3/ABgU4uWuO2yoAIyrFL/2UDm4MkM0QJgS0z7TNxNShzQGUvPI3eaMxCV9xhzaEqEzKHxn3emfmBVmBEBj11N7KsoryXcnoIUfwVpXlYIHR3DL78Xjhr7WovWeoobnX519MPlEIGZ30PXzWvXasexPsD3J9QQ40+74wgtohJQBj5caDljCj0dak6vvmR8P8tc+hmp6ALy5eGFlU56QEXL/XnMZawMq5twsTjFDrCN6diHQGY6cHg+MRPlPAo6bXMsap3EO8fNkVcgS4GkewMxC/OLL49Cs7vypMRxPqZI05WAqxZcU2HdIeEW9M6vCvZuvgUIg/X5o1zAiXdlusety7ELUZ9ep8DZeeAXf9kX2a7lNRcWiFn+XkAhoBHdhvNRzOQx6GK6KNBBhoSqd+ReMzhVA1jQAAAGZX5dGIGJFwYTYqp1E5TRhR5DBys/gDy52w0eop1gYApJEoKGA4LJj1wGJAOkDmElJIBIxMSrJgkYEaWOI7pUSdjc4IoFcBCADu8GqRkYyxYkQiCKKYCESZuKOSB8lH87fV2oynirM169YASFhZf2QkPB0T/Qn8KSyyomLWIT8vIQiMCNppysmKV33xs7mGM6WmTAHyD4BMwBgrvlvmPay4JCh6CMwUDAjYSkE7TdlNenuO/qbVkIUgUDBAGjesDdhZYI2w8VyLCQBSYaIqzWYKQh1KudmdrklbvtVeotpCa9IcpfuNnWnGeIPuNHSkiWoDXB6v0zWViXtjW3/6faVdd/Ue+3KYdXm8KbryXa3dzuqqslyL9vWma9Ga3o9MPn7ukGRZHYqw8dtPXqxf46kESdofLxkrrV2DCUHKs5gK8nKwoiyuMNE4v2N7zsljB9LXt6afAJISJJmNchDC/FwzSrFL/gjw2/qrfrz+UcA3WJEWjV3oW5wAAAAASUVORK5CYII=',
      bgColor: '#003366'
    },
    {
      name: 'Bakcell',
      category: 'Telekom',
      complaintCount: 128,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAsVBMVEX/////+vv/3OL/fpn/DEX/mK3/6/D/pLP/OmL/ACn/DTv/qLn/9/n/1t7/t8P/aYT/ACT/ADD/ADb/ADP/Jkb/6u//iZn/AC7/ADf/UHD//f7/AD7/ACz/ADL/3+T/ABr/8vb/x83/G1L/ME3/jKL/dYz/AB//v8v/rLj/laf/MFb/V3D/j6D/ytb/cIX/m6b/0dr/XHv/s8T/ZYP/YXr/OV7/gJL/tL3/G03/AAT/VHVPY474AAABc0lEQVR4AW2SBYLDIBBFacqmIQpMW4jWI3W3+x9so2vsj+cxDvqhntbHH+g/6drAIMS0VGI7rocp4zAcKUbu2CCCSymZ/5cFgzCKZS2ihEx8IVtNpn/hDHjLYJ6Yi07DZYDQdBV1hmQ5TaETS8vkNAwt4zTpGax6ASY4XmQoyKn88moHBY0FkevNamvtEKrXNiL9HnLmxv6QZ0mAKmmE11aM0LBcax+dqg+uVsN+JEGQCT5tZ0kPtfKG/q56mmmKTx8j3fpZOAPAefl2zmxUyqArvUGBFVathPTSdcRKOb02TR+IpjRIjYYdMUhxTRrISjseR/haNGPZlIujQ1COG6FsDVxEt7HbOAoKySXHLhrdNxnSr2l0ejh2N7MtUGC+lm1i9izsbOnoPzfP1Jq/7qNrxCXwMrSiqa1fq7nyKMyCf/C+GTrQpa7A4N4Olqfvo0LHLQQxedsKZFX1hDy9x1EJuwVGibGcJTpSZT3fZ93+YfMJPjIqWDpVTdsAAAAASUVORK5CYII=',
      bgColor: '#FF6600'
    },
    {
  name: 'Buta Airways',
  category: 'Havayolu',
  complaintCount: 32, // Hypothetical number, as no specific data provided
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA0lBMVEXIMT7rMkToMkTsM0TsMkbnNErqM0PrMkLGMUDrMkPtMkPjLT/lJj7rL0HjVF3he3/um53ogYTWOErjeH3uvcL8/Pz8//777OnvkZDgMDrhHDXijJHx4OLXKz/la3jgRVjuLD7RNkL74t//7PDpc4HeWGrWMUTz1trig4z5///dUGD/8/f/6uXsoqfqr7T6ztHTEiPyy8T+9vfnWWnmSFHlVF73xsXccoL5+ffqp6b///bTe4vXX2jSHi/s2Nvoyc/OanbhucTxydHnipLfo6/Sj56ExliIAAABxElEQVR4AV3ShaLiMBAFUCbtS2rBk+IONTSwb4P7///STp8ge/E53EHaTAaIYZgGBsgHIZSCaQKYwHCSsXCaku24nslpGvhCm1JEDDOAZ3P5QtGjOGQp2ilmnK8i5aWykH6l6jmMAcbGIOJ2wLe5tbpoNFvldsdOCWN8I8UQ3u31yUD4Q06eiA9ots1GQb8YRlgnBOCJX+nEyXg0kUKWOAAw9oa1aTSbL4SQhRol7wg8VtEkqyIRLVd/+OtaAlD9FOLvVGgZzNdTlz0R19TqGy22Smi9i5Pe3oEHEsKXvhaHQAudG/aF3juPJpikOotk4yhl/1TviyioOezRhE64kf2j0MpXkVDJjjmU/iJrziJ1xs/TSsvksjOp/cTOMlFHpVO8bON908XiE3O6cdBfwaWNRrkKYD/wqrGohJDIG70p115xl5yVOp6Pt7Kftq/85ajwURBczti8jEa5he4VOWMPZLW6PGNHqKDlNnclz2DPP54ydyE3iP497K5WHbAfTYxDuuWNFFqqoPE5+ho9EMNr9Z6WUvqTDxP+R0o9N1so7JoeSU/xByJ8rXZ4h3NOCHwhDlM0KE1fAyFOhxFCmYHBofEPQb86HvXyLY8AAAAASUVORK5CYII=',
  bgColor: '#0055A4' // Blue color to match Buta Airways' branding
},
    {
      name: 'Nar Mobile',
      category: 'Telekom',
      complaintCount: 112,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAMFBMVEVHcEzVMljUMVfUMVfUMVfUMVfUMVfUMVfUMVfUMVfUMVfUMVfUMVfUMVfUMVfUMVcFEg0+AAAAD3RSTlMAEO0gv8xYMmqAR9mvkZzTPWNDAAAA2klEQVQokXWS0RaEIAhEEU3FMv7/bxfQ3Nqlecg8V2SaALgrxBjAVd3YlPIfIr6pPu9Dfmi7sci/wtU7/DGhF9wcyOdg2WPMxSD6MCkrPmNWT126N4Cme1mjOqAgX5DNjjirWT1HoB5hlxBKrWYJ5X3XFv0w36Hw8KhNpcDahlxB1wpJD4+YvpAGjBNq5X7BhlCQMeYJD4HHgraVNI8ByWCy/PSJnVLqfK6I3GR5Rv8WUH2PfRS+xC5pWbKubMqSzxrMH4Yn0fPMdk1QKHMe9oWaM9US7tnJI54+oUkbWXLvrqsAAAAASUVORK5CYII=',
      bgColor: '#8B0000'
    },
    {
      name: 'Azərsu',
      category: 'Kommunal',
      complaintCount: 98,
      icon: 'https://xidmet.azersu.az/e-services/exidmet/images/logo.png',
      bgColor: '#0066CC'
    },
    {
      name: 'Azərişıq',
      category: 'Kommunal',
      complaintCount: 87,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAIAAAD9b0jDAAABHklEQVR4AWMYOmAUjIJREG/Nnu3Cba7KTDUTE8y4S9254+1E5+YwyYkxBGvwT/SSmBkimmshCCQr3HiL7ETb/SSKXISnxkpMiBfL9OAv8hfoSxNuTxZKcOedUSgCRNn+fCiGplsKJRmIHipTT7QXctLhbLSVAAoCTRHkYlwWIwZkA41u8hFbkSYDNBfIBSprDBfuiBNeUiYONBqIgIJAc1EMdVfjB7oFaO7sWHkg10GOB+hSoE0R+rzdfkJgl4IMBZoFVAlUAAwlIHtrlXRVmKCXGRfQvUBz4YYigI4w55ZYVRUhdggbaC4QmYpx+ysJApGNNA8wTDzVeCHISpkzyJgXiIDeMlBkB5JAo4Hhhg6AOvcGq4+MRDkKRsEoAACJ1UR74cl3/QAAAABJRU5ErkJggg==',
      bgColor: '#FFD700'
    },
    {
      name: 'BP',
      category: 'Nəqliyyat',
      complaintCount: 76,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEVHcEz////+/v3+///+///+///////3/P/////+///////8/v////////////8CqfQAqPX///8ApfQAo/SS0Pjq9Pn0+/9qwvddvfVIuPfX7v2Ay/jD5vwarfW24PsAofMzsvWg1/qs2vgosPWZxacvruj14DBnuMzRbYaVAAAAD3RSTlMA0/eGwWCpD5rjai8mSjGgfYs9AAABcUlEQVQokWVS6XqDMAwDyr12RLk5A3TH+7/hnBToaP3LiexPsuwoOuKalXle1p/Re1wS7FEWZyijv06atrVyoPTyH0uBaXScUXDBFqB6NsfQrWDNFkyMHZLi6FPsgALsBlQ7nz5jFK5DGUCgfcUaxoAPPwMm4V+Pvx3lPVICE4yMckv/7PvrQIVGEV3ROeLQA8llvz/UzEMBX5GRHMk9OFlDU7ZMzH0rPGhIUglDlU4psu8uISQZNHgRI5HmQSuB86y7Hg2mRoZ6TqNuoJ6cW3QPi5k7LMQkCCzhdYoB86i7Dqu689DJGsRRHQSxuyYuBRl2Fjgt8ugzpDRB31vTCKPkpnZB7d17+ML9fMwQZ3g6RSYQqaffPR3XLbFEGUUFvH8HuhUKhVu4nmDgy8qm4DtFhcGdl+ZI9XYKRYKOPXnpTibguNCiAnrBvWpairPqsek9SkCvZuSisQtB6flyr+lx04hvbydfZGVaVXFeP7v+AKIiKwHiPJ4rAAAAAElFTkSuQmCC',
      bgColor: '#FF4500'
    },
    {
      name: 'Pasha Bank',
      category: 'Bank',
      complaintCount: 65,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjUlEQVR4AZySA5BcQRCGO7ZtO+u3Z5Vj7a3OZtln27Zt27bNUmw76czG1lf1F2ba3fA7xrZLhU9upkLhf8BFR89NbeEiCYAIx23gjzjz9YniiaLmewtj2NYXg6e3UmXX17DxzkoWju+gXPbb8XTAR5RAbEzgB7xFLRCqjmCviuArQvAS9hOn5BtrOfhiHh2fr2G0sh15heAnRhKgGb5nt90l7UtGp3IgQgPBU4gb7HlVYzuogpfz6XhrM6f2iKfAkyR4AtaXJP9J8D0j+6ScEA6XiMzPekKGLq5w4E3cX8Vsw8X0m/vcBUGQrCPJjBCohqtteCXwNQjHbO4uZ+G11WzEebRiTZMzEZCrV5Z/TJaVxlHYBxk6eesceF0bXFTrl0eq12nqnoxGOCIGCVObqbDJLRTeX8bER4sZkokTHb3SdkT2EHykebcU48Z6VsXoHm7R8G5uxvhObuX0JgpnNlHJMLOZipvdyMH2o7K1dWz5jEamfHHdcdmqDClFNnwkV0ll3/0VrCuS4NfIViSaIkmJbwxIIB9ChtWlUEjQqgI/US0EituhyKAggyW/m4gGhfpFR7yFsTe3cEpez6Xh4yVMxDk0J/ia5Ta8XPAWfhhUkjaq6Z6MIEO9MnBYtoOsdAyiNHG/r9D32TpmeZaisjf8gKsgGhxVkWR/oW54KgDn0ypfzaNhPUuhDALE1WDHe7+BzR6CXAgQ6f3sEislBlzLC8U4/3jD7RUsfLGAgVWUYjqk6vSBhwDBlgTxFiG4CXp/FsAQ3AUpq/1E+pUMeacnZCO3yAkP7ZOufDffHN/pXM2hC4Ea5wPVLQHiLMKZiVG38pq06f9HIsbAaNUIITUzwtLI5OvSpvPwqQEAtacj34tpd+UAAAAASUVORK5CYII=',
      bgColor: '#1E3A8A'
    },
    {
      name: 'Yelo Bank',
      category: 'Bank',
      complaintCount: 54,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAclBMVEX/xij/yCj/yynlsiSPbxbSoyH/zCmGaBQAAADLnSD/xyj/zipTQA3uuSX1vib5wSfptSQvJAY3KgiAYxMTDwN1WhIsIgfZqCI9Lwl7XxOgfBmpgxpJOQvFmR9dSA5oURCviBsnHga4jx0LCAEVEAMjGwV8V2VTAAAA1UlEQVR4AdVQhYHDQAyzXVKPw8zJ/iMWn2GAHp9REr34YOH/fbv94V/v8YTzF6dSb5vvRm1gWbF68znLyltivwtKKRfFXuzOysMpSeo4y6kogcxLgUrXAGp5OBscKG05j84NTrpD3aE/DOjuTfiA0WFfIM4GTJQhDLBHj0zuPQlZh+5WrjjMsxi4L07iOKpRULmM9XKyq+Hzo+yTrey3clMceiBzBZKjzBOmWZ5cvIXRxGQtsw9Okbjg5EMx1PKmBj3ov4nwRqbjf7UuZqfoX68oev1xBXszDHOSxokgAAAAAElFTkSuQmCC',
      bgColor: '#FFFF00'
    },
    {
      name: 'Wolt',
      category: 'Yemək Çatdırılması',
      complaintCount: 43,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAnFBMVEUAxOwAw+wAwusAwesAwOsAvuoAveoAu+kAuegAtecpuugAtOc7wOqr4vWB1PFzzu/t+/6h3PNQv+r///8AsOXw+v3E6fgAp+MAq+S04vXh9fs6ueiQ1/HP7voAoOD5//+K0O9bvOlrw+tJsOUAmN6Tzu4AlNwAnN+Ex+yr2fIAn+AzqeMAlN0Aj9sAi9oAh9kAg9cAf9YAe9UAd9OhLRahAAAA8klEQVR4AbyOBXLEMAwAV7bCKeNQ//++I18S2wrMlGG4axADfyHCKyZ8wkSE39F/CZp81BX56JJPurpNvCO/tBV7rX4NgoBkcdmLJTDvmVwGE6TbyqdcD7XEAkIjIjYURwfarDFJwd0EfHXqCHVEXV6LHGAaq74f6Dle+fTQxxaSAqpgaeriiZQrzaYjfRMqUHBmVsGxbq/aQg4l18FfhYtrsQVXVVXjFTftUxF7TcPz2XSfL+6WgLxAM9YuxtLFUKmLms1ZdIFtW/CTRyZ8aYsSEz7B6tfESnr9XpVNqqMcKRnXuymUq755ZZ4u3vgcSpIAhlFn6F4epkcAAAAASUVORK5CYII=',
      bgColor: '#009DE0'
    }
  ];

  const categories = ['all', 'Telekom', 'Bank', 'Yemək Çatdırılması', 'Havayolu', 'Kommunal', 'Nəqliyyat'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bütün Şirkətlər
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Azərbaycandaki şirkətlərin şikayət statistikalarını araşdırın və öz təcrübənizi paylaşın.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                Şirkət Axtar
              </label>
              <input
                id="search"
                type="text"
                placeholder="Şirkət adı və ya kateqoriya..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Kateqoriya
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">Bütün Kateqoriyalar</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredCompanies.length}</span> şirkət tapıldı
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <CompanyCard
                key={index}
                {...company}

              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Heç bir şirkət tapılmadı</h3>
              <p className="text-gray-500">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Platformada Ümumi Statistikalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {companies.length}
              </div>
              <div className="text-gray-600">Qeydiyyatlı Şirkət</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {companies.reduce((sum, company) => sum + company.complaintCount, 0)}
              </div>
              <div className="text-gray-600">Ümumi Şikayət</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Kateqoriya</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
