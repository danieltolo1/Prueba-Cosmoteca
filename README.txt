Proyecto cosmoteca realizado por Daniel Torres Londoño

Librerias Utilizadas:
- Axios
- Bootstrap



Funcionamiento del Proyecto:

1. El proyecto se divide en 2 coumnas gracias a Css en el componente Main, ademas de un nabvar en la parte superior gracias a Bootstrap
2. En el Main se realiza el llamado de la Api de google Books  en donde se programa de tal manera que al escribir en el input
   se pueda generar un filtrado de lo que necesite buscar.
3. Gracias a un componente llamado Card podemos renderizar en la parte izquierda del Dom del main.jsx una visualizacion de nuestra busqueda 
    con la imagen del libro y nombre del mismo.
4. Se agrega un boton de Favoritos para poder obtener la informacion en Json de dicho libro el cual queremos que fuera el Favorito
5. Se trata de renderizar por medio de otro componente para visualizar el json creado como preferido pero no es posible que el props que se estaba 
   programando le enviara informacion del componente hijo al componente padre.