# Prueba-Airzone

En esta prueba se han desarrollado los siguientes puntos:
Especificaciones:


  • El clima se obtiene de https://openweathermap.org/api (necesario hacer cuenta gratuita y 
  obtener clave api para las peticiones). El API que nos interesa del proveedor de clima es la 
  One Call API (https://openweathermap.org/api/one-call-api). De la respuesta de esa petición
  nos interesa únicamente las secciones “hourly” y “daily”.
  
  
  • El microservicio deberá implementar un mecanismo de caché:
  ◦ Si se pide el clima para una ubicación por primera vez, se realiza la petición a 
  openweathermap y se almacena en BBDD. Se debe registrar la hora a la que se ha 
  solicitado.
  ◦ Si se pide el clima para una ubicación ya existente en BBDD, se devuelve ese 
  documento únicamente si la hora de solicitud asociada a esos datos no ha superado las 3 
  horas. En caso de que el documento sea más antiguo, se deberá refrescar los datos 
  realizando una nueva petición a openweathermap.org
  • El microservicio deberá implementar un endpoint GET:
  ◦ Dadas las coordenadas, se devuelve el clima para esa ubicación (secciones “hourly” y 
  “daily”).
  • Implementar microservicio en NodeJS, usando Express como framework REST
  • Usar MongoDB como BBDD
  • Definir un Dockerfile con la imagen del servicio.
  • Publicar el proyecto en Github/Gitlab
  Extra:
  • Implementar una definición de la arquitectura en un archivo docker-compose.yml que 
  incluya el microservicio y la base de datos mongodb, tal que sea completamente funcional.
  • Implementar un endpoint adicional GET para obtener el clima de una hora en concreto. El 
  endpoint devolverá el objeto “hourly” correspondiente a la hora especificada en los 
  argumentos de la petición (en querystring o en body). Ejemplo: En la petición se pide la 
  información climática de las 13:00 de hoy; si está en BBDD, devolver únicamente la entrada
  de “hourly” correspondiente a las 13:00.
  
  Nota: No controlo Dockers, me he basado en unos ejemplos de internet para hacer el dockerfile y el docker-compose, no he podido probarlos porque no tengo instalado en mi pc ninguna máquina virtual con linux para probarlo y actualmente me queda muy poco espacio en el disco duro para poder instalarlo, por lo que no he podido probar la parte de dockers.
  En cuanto a los test unitarios, no tengo experiencia en este tipo de test, yo solo he probado servicios con soapui, para simular peticiones a servicios y apis, en este caso no tengo muy claro como hacerlo.
