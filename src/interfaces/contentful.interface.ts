export interface ITransversalResponse {
	data: {
		pageCollection: {
			items: ITransversal[];
		};
	};
}
export interface ISubTransversalResponse {
	data: {
		subTransversalCollection: {
			items: ISubTransversal[];
		};
	};
}

export interface ITransversal {
	slug: string;
	nombre: string;
	tituloPrincipal?: string;
	tituloSecundario?: string;
	descripcionPrincipal?: string;
	descripcionSecundaria?: string;
	accionPrincipal?: string;
	accionSecundaria?: string;
	imagenPrincipal?: image;
	urlPrimaria?: string;
	urlSecundaria?: string;
	otro?: string;
	imagenesCollection?: {
		items: image[];
	};
	subPaginaCollection?: { items: ISubTransversal[] };
}

export interface ISubTransversal {
	slug: string;
	nombre: string;
	titulo?: string;
	subtitulo?: string;
	descripcion?: string;
	descripcionSecundaria?: string;
	imagenesCollection?: { items: image[] };
	accionPrimaria?: string;
	accionSecundaria?: string;
	otro?: string;
}

interface image {
	url?: string;
}
