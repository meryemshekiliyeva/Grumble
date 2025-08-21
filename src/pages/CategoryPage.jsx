import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Category data with companies
  const categories = {
    'banklar': {
      name: 'Banklar',
      companies: [
        {
          id: 'kapital-bank',
          name: 'Kapital Bank',
          logo: 'https://www.kapitalbank.az/files/about/main/png.png',
          rating: 3.0,
          complaints: 139,
          description: 'Azərbaycanın ən böyük istehlaklı banklarından biri'
        },
        {
          id: 'pasha-bank',
          name: 'PAŞA Bank',
          logo: 'https://www.pashabank.az/templates/images/pashabank-logo-en.svg',
          rating: 2.8,
          complaints: 8,
          description: 'Müasir bankçılıq xidmətləri təqdim edən bank'
        },
        {
          id: 'birbank',
          name: 'Birbank',
          logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOC4zLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA2ODUgMjQ4LjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY4NSAyNDguMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGMDAzOTt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU5LjgsMzkuNWMwLTMuNi0yLTQuMy00LjQtMi45TDcuNyw2NC4yYy0zLjIsMS44LTQuNCw0LjktNC40LDcuOXYxMzYuNmMwLDMuNiwyLDQuMyw0LjQsMi45TDU1LjQsMTg0DQoJCWMzLjItMS44LDQuNC00LjksNC40LTcuOVYzOS41eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTYuMiwxMjguOXYtNzRoMTcuOXYzOS45YzUuOS03LjMsMTUuNS0xMi4yLDI2LjktMTIuMmMyMS44LDAsMzkuMywxNy4zLDM5LjMsNDEuNnY1LjQNCgkJYzAsMjQtMTcuOCw0MS40LTQyLjQsNDEuNEMxMzQuNiwxNzAuOSwxMTYuMiwxNTUuMywxMTYuMiwxMjguOUwxMTYuMiwxMjguOXogTTE4Mi4zLDEyOS4ydi00LjRjMC0xNi05LjUtMjYuMi0yNC4xLTI2LjINCgkJYy0xNC43LDAtMjQuMSwxMC4zLTI0LjEsMjYuMnY0LjRjMCwxNS43LDkuNSwyNS43LDI0LjEsMjUuN0MxNzIuOSwxNTUsMTgyLjMsMTQ0LjUsMTgyLjMsMTI5LjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIyMy45LDUyLjljNi41LDAsMTEuNCw0LjEsMTEuNCwxMC4zdjEuMWMwLDYuMi00LjksMTAuMy0xMS40LDEwLjNzLTExLjYtNC4xLTExLjYtMTAuM3YtMS4xDQoJCUMyMTIuMyw1NywyMTcuNCw1Mi45LDIyMy45LDUyLjl6IE0yMzIuOSwxNjlIMjE1Vjg0LjZoMTcuOVYxNjl6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMxMy44LDEyOC45di03NGgxNy45djM5LjljNS45LTcuMywxNS41LTEyLjIsMjYuOS0xMi4yYzIxLjgsMCwzOS4zLDE3LjMsMzkuMyw0MS42djUuNA0KCQljMCwyNC0xNy44LDQxLjQtNDIuNCw0MS40QzMzMi4yLDE3MC45LDMxMy44LDE1NS4zLDMxMy44LDEyOC45TDMxMy44LDEyOC45eiBNMzc5LjksMTI5LjJ2LTQuNGMwLTE2LTkuNS0yNi4yLTI0LjEtMjYuMg0KCQljLTE0LjcsMC0yNC4xLDEwLjMtMjQuMSwyNi4ydjQuNGMwLDE1LjcsOS41LDI1LjcsMjQuMSwyNS43QzM3MC41LDE1NSwzNzkuOSwxNDQuNSwzNzkuOSwxMjkuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAzLjYsODZsLTQuMiwxNi4zYy0zLjMtMS41LTYuNS0yLjQtMTAuNC0yLjRjLTExLjQsMC0yMCw4LjgtMjAsMjMuNVYxNjlIMjUxVjg0LjZoMTcuOXYxMS43DQoJCWM0LjktOS45LDEzLTEzLjcsMjEuOC0xMy43QzI5NS42LDgyLjYsMzAwLDgzLjcsMzAzLjYsODZMMzAzLjYsODZ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQwOS4xLDEyOS41VjEyNGMwLTI0LjEsMTcuNC00MS40LDM5LjMtNDEuNGMxMS40LDAsMjEsNC45LDI2LjksMTIuMlY4NC42aDE3LjlWMTY5aC0xNy45di0xMC4zDQoJCWMtNS45LDcuMy0xNS41LDEyLjItMjYuOSwxMi4yQzQyNi41LDE3MC45LDQwOS4xLDE1My43LDQwOS4xLDEyOS41eiBNNDc1LjMsMTI4Ljd2LTMuOWMwLTE2LTkuMy0yNi4yLTI0LTI2LjINCgkJYy0xNC43LDAtMjQsMTAuMy0yNCwyNi4ydjMuOWMwLDE2LDkuMywyNi4yLDI0LDI2LjJDNDY2LDE1NSw0NzUuMywxNDQuNyw0NzUuMywxMjguN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTI5LDEyMC4zVjE2OWgtMTcuOVY4NC42SDUyOXYxMC42YzQuNC02LjUsMTIuNC0xMi41LDI0LjgtMTIuNWMxOS4xLDAsMzEuNiwxMy41LDMxLjYsMzYuM3Y1MGgtMTcuOXYtNDguOQ0KCQljMC0xNC4yLTctMjEuNS0xOC40LTIxLjVDNTM4LjMsOTguNiw1MjksMTA2LjcsNTI5LDEyMC4zTDUyOSwxMjAuM0w1MjksMTIwLjN6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYyMSwxNjloLTE3LjlWNTQuOUg2MjF2NjUuOGwzNC4xLTM2LjJoMjMuM2wtMzMuOSwzNC4ybDM3LjIsNTAuMmgtMjJsLTI3LjQtMzhMNjIxLDE0Mi4zTDYyMSwxNjlMNjIxLDE2OXoiDQoJCS8+DQo8L2c+DQo8L3N2Zz4NCg==',
          rating: 1.0,
          complaints: 1,
          description: 'Rəqəmsal bankçılıq həlləri təklif edən bank'
        },
      ]
    },
    'telekommunikasiya': {
      name: 'Telekommunikasiya',
      companies: [
        {
          id: 'azercell',
          name: 'Azercell',
          logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEVHcExcJINcJINcI4NWFX9PAntpOox8V5pIAHeUeKzn4ez////Qxtq9rsuumcD08fY/OFb6AAAAA3RSTlMAlfE8+ngLAAAAzElEQVR4AWNgEDKGA0UGBiZjJKDAIIzMNWRQRuYaMRijABjXBIXrmu6CxLWYtXunM5xr4rOr5LaxsTOU67Z7hnPXFIurEK5J9jZnY78nPUD1IK7bfqC5nk9XQ7nxQElj8/e7S8CKLU4DaePO3YshRrnvCQaK3d7bDLGoa4uxsWnW7htQe6uBFvTtXvkEwjV5XWzcvnpfH5Rrerq17fSu1BgY9/bd1ftnGPsVQ/Xa7941wxnsQ4i95a7OyN43QQsNBEALOrSARQt2tEgBAM2AbrbhuFpxAAAAAElFTkSuQmCC',
          rating: 3.5,
          complaints: 45,
          description: 'Azərbaycanın aparıcı mobil operator şirkəti'
        },
        {
          id: 'bakcell',
          name: 'Bakcell',
          logo: 'https://www.bakcell.com/data/new-logo.svg',
          rating: 3.2,
          complaints: 32,
          description: 'Müasir telekommunikasiya xidmətləri təqdim edən şirkət'
        },
      ]
    },
    'Havayolu': {
      name: 'Havayolu',
      companies: [
        {
  id: 'azal',
  name: 'AZAL',
  logo: 'https://www.azal.az/assets/images/logo.svg',
  rating: 3.5,
  complaints: 45,
  description: 'Azərbaycanın milli aviadaşıyıcısı, beynəlxalq və daxili uçuş xidmətləri təqdim edən şirkət'
},
       {
  id: 'buta-airways',
  name: 'Buta Airways',
  logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA0lBMVEXIMT7rMkToMkTsM0TsMkbnNErqM0PrMkLGMUDrMkPtMkPjLT/lJj7rL0HjVF3he3/um53ogYTWOErjeH3uvcL8/Pz8//777OnvkZDgMDrhHDXijJHx4OLXKz/la3jgRVjuLD7RNkL74t//7PDpc4HeWGrWMUTz1trig4z5///dUGD/8/f/6uXsoqfqr7T6ztHTEiPyy8T+9vfnWWnmSFHlVF73xsXccoL5+ffqp6b///bTe4vXX2jSHi/s2Nvoyc/OanbhucTxydHnipLfo6/Sj56ExliIAAABxElEQVR4AV3ShaLiMBAFUCbtS2rBk+IONTSwb4P7///STp8ge/E53EHaTAaIYZgGBsgHIZSCaQKYwHCSsXCaku24nslpGvhCm1JEDDOAZ3P5QtGjOGQp2ilmnK8i5aWykH6l6jmMAcbGIOJ2wLe5tbpoNFvldsdOCWN8I8UQ3u31yUD4Q06eiA9ots1GQb8YRlgnBOCJX+nEyXg0kUKWOAAw9oa1aTSbL4SQhRol7wg8VtEkqyIRLVd/+OtaAlD9FOLvVGgZzNdTlz0R19TqGy22Smi9i5Pe3oEHEsKXvhaHQAudG/aF3juPJpikOotk4yhl/1TviyioOezRhE64kf2j0MpXkVDJjjmU/iJrziJ1xs/TSsvksjOp/cTOMlFHpVO8bON908XiE3O6cdBfwaWNRrkKYD/wqrGohJDIG70p115xl5yVOp6Pt7Kftq/85ajwURBczti8jEa5he4VOWMPZLW6PGNHqKDlNnclz2DPP54ydyE3iP497K5WHbAfTYxDuuWNFFqqoPE5+ho9EMNr9Z6WUvqTDxP+R0o9N1so7JoeSU/xByJ8rXZ4h3NOCHwhDlM0KE1fAyFOhxFCmYHBofEPQb86HvXyLY8AAAAASUVORK5CYII=',
  rating: 3.2,
  complaints: 32,
  description: 'Azərbaycanın aşağı büdcəli aviadaşıyıcısı, beynəlxalq uçuşlar təqdim edir'
},
    
      ]
    },
    'e-ticarət': {
      name: 'E-ticarət',
      companies: [
        {
          id: 'trendyol',
          name: 'Trendyol',
          logo: 'https://cdn.dsmcdn.com/web/logo/ty-web.svg',
          rating: 4.1,
          complaints: 23,
          description: 'Onlayn alış-veriş platforması'
        }
      ]
    },
    'yemek-catdirilmasi': {
      name: 'Yemək Çatdırılması',
      companies: [
        {
          id: 'wolt',
          name: 'Wolt',
          logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACAAIAMBEQACEQEDEQH/xAAZAAEBAAMBAAAAAAAAAAAAAAAGAwACBwH/xAAtEAACAgAEBAQFBQAAAAAAAAABAgMEAAURIQYxQWESUXHwEyMykbEUFSKBof/EABoBAAIDAQEAAAAAAAAAAAAAAAIFAAEGAwT/xAAtEQABAgQEBQQBBQAAAAAAAAABAhEAAwQhBRIx8BNBUWGhIjJx0RQVYoGR8f/aAAwDAQACEQMRAD8A6jxRxEMpUV6wV7bjXflGPM9+3s+2kpON6laQmxXFRSDhy7rPje+4K5mFy6xa1Zll16M2w9ByGHKJSEe0NGQnVU+eXmKJjKeYXKTBqtmWLTorbH1HI4i5SF+4PEk1U+QXlqIh7wvxEM2U17IVLaDXblIPMd+3sJquk4PqTpGvwrFRVjIuyx53vsMlV84vZjbaTwhEeckjXUAgBf8AQP6w1BElCEN2jMKSqtnTZr6An6EUbILEa2BK3z4o4nWJFLFi50C9j98CKpJIbQv4gzhc1IVmPqASWH7izfP9xOHJLLfqBY+SYoRIvJhIWbwqAQdNzrv2wSqlNst3P+wEvDppzZ7MH6u5YDXnHvwLOQZzA0xAaJ1bVDqCOo+xIxWZFRKLc4vhzcPqklfIjTz9RSOwchzK/XkriUfQFZtBswZT3Gw2664Eo/IlpUC27waZpw+fMllL8vLg/HaKx8SSLLBKYC0iqqzt8TeXwqyjpt9RPXfTyxRpAQQ/x220dE4uoKSopuNb6sCB8avzu0afvqmq9R6zvWCRrFGZuXgJP8tt9Sd9NOQGL/GObODe726/UD+pgyzKKHSwYP062u/Nm6RFiudZ7GIIXQ2JdXDP4judT0GwH4wV5EkudBHIkV1YMiWzG93+f4AhlxRw6M2UWKxVLaDTflIPI9+/sK6Sr4PpVpGmxXChVjOiyx53vsCuZfcpMVtVpYtOrLsfQ8jhyiahftLxkJ1LPkFpiSN9Yynl9y6wWrWll16quw9TyGIuahHuLRJNLPnlpaSYe8L8OjKVNiyVe24025RjyHfv7Karq+N6U6Rr8KwoUgzrus+N77//2Q==',
          rating: 3.5,
          complaints: 43,
          description: 'Beynəlxalq yemək çatdırılması platforması'
        },
        {
          id: 'bolt',
          name: 'Bolt',
          logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA1NCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC42OTYgMTEuMTE3M0MxNi43OTc2IDcuNjk0MiAxNS43NTA2IDMuMjA3MiAxMi4zNTc1IDEuMDg3MDZDMTEuMjE4OCAwLjM3Nzc3MiA5Ljg5NjY5IDAgOC41NTkzIDBIMFYyMy41OTE0SDkuNjI5MjFDMTMuNjE4NSAyMy41OTE0IDE2Ljg1MTEgMjAuMzMwMyAxNi44NTExIDE2LjMwNTlDMTYuODUxMSAxNC4zNTUzIDE2LjA3OTMgMTIuNDg5NiAxNC42OTYgMTEuMTE3M1pNNS41MDI0MSA1LjU1MDkzSDguNTU5M0M5LjUwNjkzIDUuNTUwOTMgMTAuMjc4OCA2LjMyOTYgMTAuMjc4OCA3LjI4NTU5QzEwLjI3ODggOC4yNDE1OSA5LjUwNjkzIDkuMDIwMjYgOC41NTkzIDkuMDIwMjZINS41MDI0MVY1LjU1MDkzWk05LjYyOTIxIDE4LjA0MDVINS41MDI0MVYxNC41NzEySDkuNjI5MjFDMTAuNTc2OCAxNC41NzEyIDExLjM0ODcgMTUuMzQ5OSAxMS4zNDg3IDE2LjMwNTlDMTEuMzQ4NyAxNy4yNjE4IDEwLjU3NjggMTguMDQwNSA5LjYyOTIxIDE4LjA0MDVaTTQzLjQ0NjEgMFYyMy41OTE0SDM3Ljk0MzdWMS4xNzk1N0w0My40NDYxIDBaTTI3LjM5NzQgNi42OTk2NUMyMi43MTI3IDYuNjk5NjUgMTguOTA2OSAxMC41MzEzIDE4LjkwNjkgMTUuMjY1QzE4LjkwNjkgMTkuOTkxIDIyLjcwNTEgMjMuODMwNCAyNy4zOTc0IDIzLjgzMDRDMzIuMDgyMSAyMy44MzA0IDM1Ljg4NzkgMTkuOTk4OCAzNS44ODc5IDE1LjI2NUMzNS44ODAzIDEwLjUzOSAzMi4wODIxIDYuNjk5NjUgMjcuMzk3NCA2LjY5OTY1Wk0yNy4zOTc0IDE4LjA0MDVDMjUuODc2NiAxOC4wNDA1IDI0LjY0NjIgMTYuNzk5MyAyNC42NDYyIDE1LjI2NUMyNC42NDYyIDEzLjczMDggMjUuODc2NiAxMi40ODk2IDI3LjM5NzQgMTIuNDg5NkMyOC45MTgyIDEyLjQ4OTYgMzAuMTQ4NiAxMy43MzA4IDMwLjE0ODYgMTUuMjY1QzMwLjE0ODYgMTYuNzk5MyAyOC45MTgyIDE4LjA0MDUgMjcuMzk3NCAxOC4wNDA1Wk0zMC4xNDg2IDI4LjYwMjdDMzAuMTQ4NiAzMC4xMzU1IDI4LjkxNjggMzEuMzc4MiAyNy4zOTc0IDMxLjM3ODJDMjUuODc4IDMxLjM3ODIgMjQuNjQ2MiAzMC4xMzU1IDI0LjY0NjIgMjguNjAyN0MyNC42NDYyIDI3LjA2OTggMjUuODc4IDI1LjgyNzIgMjcuMzk3NCAyNS44MjcyQzI4LjkxNjggMjUuODI3MiAzMC4xNDg2IDI3LjA2OTggMzAuMTQ4NiAyOC42MDI3Wk01My45OTIzIDcuMDE1NzZWMTIuNTU5SDUxLjI0ODhWMTYuOTIyNkM1MS4yNDg4IDE4LjI0MSA1MS42NjkxIDE5LjIxMjQgNTIuNzY5NiAxOS4yMTI0QzUzLjE4OTkgMTkuMjIwMSA1My42MDI2IDE5LjE2NjEgNTQgMTkuMDUwNVYyMy4xMzY2QzUzLjE3NDYgMjMuNTkxNCA1Mi4yNTc2IDIzLjgzMDQgNTEuMzE3NiAyMy44MzA0SDUxLjI0ODhDNTEuMjEzNCAyMy44MzA0IDUxLjE3OCAyMy44Mjg0IDUxLjE0MzYgMjMuODI2NEM1MS4xMTEyIDIzLjgyNDUgNTEuMDc5OCAyMy44MjI3IDUxLjA1MDEgMjMuODIyN0g1MC45OTY2TDUwLjg5NzIgMjMuODE1QzQ3LjgyNTEgMjMuNjUzMSA0NS43Mzg3IDIxLjcwMjYgNDUuNzM4NyAxOC4zMTgxVjE4LjMwMjZWMTguMjc5NVYxMi41NjY3VjMuOTU1MDRMNTEuMjQxMSAyLjc3NTQ2VjcuMDE1NzZINTMuOTkyM1oiIGZpbGw9IiMyRjMxM0YiLz4KPC9zdmc+Cg==',
          rating: 3.2,
          complaints: 156,
          description: 'Sürətli yemək çatdırılması xidməti'
        },
        {
          id: 'yango',
          name: 'Yango',
          logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACHElEQVR4AcWXRVrtQBCF+8Lw+cPdXacMkS3g7oyYoDtgASwBm+Hu7rALXK77vV2k8FA46dDfF62TnD+VVnZXtIyln2s0fRcazbG0gaDtSPLovWQslT0u0o1iKeBAkRqb5GWXPIvuv5yYqweRyjDtRKAeRA+TTk7e+4AhJweMeXmyTRsYKNNc/v9PNLjp0tOfrROYAf5eAOfWFjwpCCXTWDs7iYabzaCLi3suA5x9JGXOjQ3ycn1Gxn1cFx8P4HAQjbmx8cV3fgxgfZ28XJeWdh93jIyQuHNlBS48PRUCWF2lADExN/UjK4um3mQCbXQ0xhUCWFkhJlgJ8Qude3skZmpowOcUBFhaIiaX//6Bqbqa3HdMT8OFh4fCAIuLFMDLC9yHh/LU63SgDQvDZ5QFcCwsyN1dLrB2dNDUV1aiXgDA3BwB4FarPPWjo6gVBDA7C68VrtWCNiREIMDMzKsAxuJi1AkEmJp60dw+OIgawQCTk8+n/uwMtP7+KgCMjz+f+rw8qlerDtj7+jAmHuDy50/s2+lYEBurDoCxqIiYu/b3iU4YgH1ggI7z7e3qAFz+/g3cYiEAZKgVBWAqKyPmOD0jWlEAz810zM3NygC8NSnF8R5sNrk756AND1diWs7ZW0sxHFxM9fWyjfb5H9notLz3Gxcm3QyXR7hM+gZz2wVjyXeL0yICId68kD0qd5nokQSHAs0PMe13X47lCmQF/ACoNIq8AAAAAElFTkSuQmCC',
          rating: 3.8,
          complaints: 89,
          description: 'Müasir yemək çatdırılması platforması'
        },
        {
          id: 'fooderos',
          name: 'Fooderos',
          logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAA0ElEQVR4AWJwL/AhGv8PEPIHNFfGNgzDMBBcgot4Eo3hFTSBem+hXlXaLKAdvEIGSEiAbgL4QRh8w8V1gu5BkaJSlZaB3RkVb8o3mRkKYAcJcmOBAVzeSfJ6OJB8IcmL3R8JsHr53wn0fzEOwOfhAfz9m9ITGEoJBXDxzho5GMBSkrp+wCdwuZDke6gHSF9td0kowOfkkteFplsVCU8BKH/jjyEOsHHlgScAX/FUSlzEaULJDCCgCtT+uLJ+B20XeCUmkNe7lpH4PDelHg3H4AcefmsOpI9osAAAAABJRU5ErkJggg==',
          rating: 3.4,
          complaints: 67,
          description: 'Yerli yemək çatdırılması xidməti'
        }
      ]
    }
  };

  const category = categories[categoryId];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kateqoriya tapılmadı</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Ana səhifə</Link>
            <span>/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-600 mt-2">{category.companies.length} şirkət</p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.companies.map((company) => (
            <Link
              key={company.id}
              to={`/company/${company.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=3b82f6&color=fff&size=48`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(company.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{company.rating}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{company.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Şikayət sayı: {company.complaints}</span>
                <span className="text-blue-600 font-medium">Ətraflı →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
