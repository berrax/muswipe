import contentfulInstance from './contentful.instance';
import { AxiosResponse } from 'axios';
import { ITransversalResponse } from '@/interfaces/contentful.interface';

export class ContentfulServices {
	static getTransversal(
		id: string,
	): Promise<AxiosResponse<ITransversalResponse>> {
		return contentfulInstance.post('/', {
			query: queryTransversal(id),
		});
	}
}

function queryTransversal(id: string) {
	return `query {
	pageCollection(limit: 1, where: {slug_contains:"${id}"}){
		items{
      slug
      nombre
      tituloPrincipal
      tituloSecundario
      descripcionPrincipal
      descripcionSecundaria
      accionPrincipal
      accionSecundaria
      imagenPrincipal{
        url
      }
      urlPrimaria
      urlSecundaria
      otro
      imagenesCollection{
        items{
          url
        }
      }
      subPaginaCollection(limit:5){
        items{
          slug
          nombre
          titulo
          subtitulo
          descricion
          descripcionSecundaria
          imagenesCollection{
            items{
              url
            }
          }
          accionPrimaria
          accionSecundaria
          otro
        }
      }
    }
	}
}`;
}
