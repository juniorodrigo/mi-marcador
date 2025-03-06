import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

import logoImg from "@public/logo-horizontal.png";
import logoIconImg from "@public/logo-horizontal.png";

export const siteConfig = {
	title: "Madrid Capital - Plataforma Administrativa de Inversión Inmobiliaria",
	description: `Madrid Capital es una plataforma administrativa de inversión inmobiliaria que permite a los inversores gestionar sus inversiones en proyectos inmobiliarios.`,
	logo: logoImg,
	icon: logoIconImg,
};

export const metaObject = (title?: string, openGraph?: OpenGraph, description: string = siteConfig.description): Metadata => {
	return {
		title: title ? `${title} - Madrid Capital` : siteConfig.title,
		description,
		openGraph: openGraph ?? {
			title: title ? `${title} - Madrid Capital` : siteConfig.title, // Asegúrate de usar siteConfig.title si title es undefined
			description,
			url: "https://isomorphic-furyroad.vercel.app",
			siteName: "Madrid Capital", // https://developers.google.com/search/docs/appearance/site-names
			images: {
				url: "https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png",
				width: 1200,
				height: 630,
			},
			locale: "es_PE",
			type: "website",
		},
	};
};
