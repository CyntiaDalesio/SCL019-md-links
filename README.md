# mdLink-Cyntia

## Índice

* [1. Flujo de diagramas](#1-flujo-diagrama)
* [2. Guía de uso](#2-resumen-del-proyecto)
* [3. Fuente](#3-fuente)
* [4. Autores](#4-autores)

# MdLinks - Cyntia

Librería desarrollada en node.js para verificar los links de un archivo con extensión.md
Dependiendo de las opciones puede: 
#### -- listar los link, en verde los válidos y en rojo los no válidos. 
#### -- Arrojar estadíscas de la cantidad total de link encontrados, la cantidad de válidos y la cantidad de no válidos.


## 1. Flujo de diagramas

![diagrama](https://github.com/CyntiaDalesio/SCL019-md-links/blob/branchCyntia/img/diagramaFlujo.png) 


## 2. Guía de uso
  ### 2.1 Instalación
        npm i md-links-cyntia  
  ### 2.2 En librería
        const mdLink = require('md-links-cyntia');
  ### 2.3 Interfaz de Linea de comando
        A través de la terminal se ejecuta:
        $ mdLink <path> [options]

        Por ejemplo:

        $ mdLink "C:/Users/Cyntia/Desktop/LABORATORIA/Md-Link/SCL019-md-links/hola/readmeExample.md" --validate --stats

        Devuelve:

  ![statsvalidate](https://github.com/CyntiaDalesio/SCL019-md-links/blob/branchCyntia/img/statsvalidate.PNG)

  Si en cambio ingresamos:
        $ mdLink "C:/Users/Cyntia/Desktop/LABORATORIA/Md-Link/SCL019-md-links/hola/readmeExample.md" --validate

        Retorna: 

  ![validate](https://github.com/CyntiaDalesio/SCL019-md-links/blob/branchCyntia/img/validate.PNG) 

        Si por el contrario escribimos:

          $ mdLink "C:/Users/Cyntia/Desktop/LABORATORIA/Md-Link/SCL019-md-links/hola/readmeExample.md" --stats 
          Devuelve:

  ![validate](https://github.com/CyntiaDalesio/SCL019-md-links/blob/branchCyntia/img/stats.PNG) 


## 3. Fuente
  [Repositorio Laboratoria](https://github.com/Laboratoria/SCL019-md-links)

## 4. Autores
  Dalesio Cyntia
