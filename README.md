Gestion de la Sécurité - Projet Site de Construction

 Description

Ce projet permet de gérer la sécurité sur un site de construction en utilisant des outils modernes de gestion de base de données, des processus de suivi des incidents, des inspections de sécurité, et des plans d'urgence. La gestion de la sécurité est réalisée en quatre étapes principales via des tables CRUD : **Incidents**, **Inspections**, **Plans d'urgence**, et **Checklists de conformité**. Ce système utilise également un tableau de bord intelligent, un modèle de machine learning pour classer et catégoriser les incidents selon leur sévérité, ainsi que des fonctionnalités avancées pour une gestion et une prise de décision plus efficaces.

Le projet suit une **architecture de microservices** qui est déployée via **Docker** pour garantir l'isolation des services, la scalabilité et la gestion des conteneurs en production.

 Fonctionnalités principales :

* **Suivi des incidents** : Enregistrement et suivi des incidents de sécurité, avec gestion de la sévérité pour prioriser les actions. Les incidents sont classés par impact, et les tâches sont assignées en fonction de leur urgence.
* **Gestion des inspections** : Suivi des inspections de sécurité, en lien avec des checklists de conformité, pour s'assurer que les procédures de sécurité sont respectées.
* **Plan d'urgence** : Création et gestion des plans d'urgence pour faire face à des incidents majeurs, en fonction de leur sévérité.
* **Checklist de conformité** : Liste de contrôle pour garantir que tous les équipements et procédures sont conformes aux normes de sécurité.

### Fonctionnalités avancées :
* **Affichage des incidents ouverts et fermés** : Suivi des incidents avec une vue claire des incidents ouverts et fermés.
* **Affichage des inspections avec conformité** : Visualisation des inspections et de la conformité des checklists associées (mises à jour ou non) pour chaque inspection.
* **Affichage sur cartes (Maps)** : Affichage interactif des incidents et inspections sur des cartes géographiques pour une gestion plus visuelle du site.
* **Description des incidents** :
Chaque incident comprend une description détaillée qui explique sa nature, son impact sur le site, ainsi que les actions immédiates à entreprendre pour le résoudre. Les incidents sont calculés scientifiquement en utilisant une combinaison de paramètres et sont classés selon leur sévérité. Ce calcul est effectué dans un script Python qui est transformé en **Java** pour le backend, afin de garantir une exécution rapide et fiable.
* **Tableau de Bord Intelligent**:
Le tableau de bord intelligent permet une gestion visuelle et dynamique des incidents et inspections sur le site. Il comprend des éléments suivants :
* **Pine Chart** : Affichage des données relatives aux répartitions de la gravité des incidents sous forme de graphique à barres.
* **Line Chart** : Visualisation des tendances dans le temps, comme le nombre d'incidents ou d'inspections réalisés sur une période donnée.
* **Notification** : Visualisation des nouvelles données ajoutées.
* **Calcul des plans échus** : Affichage du nombre total de jours d'incidents et inspections pour une période donnée.
* **Affichage des incidents et inspections ouvertes et checklist de conformité passé** : Un suivi en temps réel des incidents ouverts et fermés, ainsi que des inspections terminées et en cours, avec des données de conformité.
* **Incidents recents** : Affichage des incidents recents dans un tableau.
 Fonctionnalités avancées sur le tableau de bord :
  **Affichage dynamique** : Les données sont mises à jour en temps réel, et l'utilisateur peut interagir avec les graphiques pour filtrer et explorer les informations.
 
 ### Architecture des services :
* **Service Incident** : Gère la création, l'affichage et le suivi des incidents de sécurité.
* **Service Inspection** : Permet de gérer les inspections de sécurité et de suivre la conformité des checklists.
* **Service Plan d'Urgence** : Crée et gère les plans d'urgence pour chaque incident en fonction de sa sévérité.
* **Service Checklist de Conformité** : Gère la liste des éléments à vérifier lors des inspections.
* **Service Machine Learning** : Effectue le calcul de la sévérité des incidents en utilisant un modèle de clustering.

## Machine Learning et Sévérité des Incidents

Le modèle de machine learning implémenté dans ce projet utilise un algorithme de **clustering K-Means** pour classer les incidents en fonction de leur sévérité. Le processus est alimenté par des calculs scientifiques transformés en script Java, basés sur des critères tels que l'impact sur le chantier, la probabilité de récurrence et la dangerosité. Après avoir calculé la sévérité de chaque incident, une description détaillée est générée pour chaque incident, ce qui permet aux gestionnaires de prendre des décisions éclairées et d'attribuer les tâches les plus urgentes.



## Installation

### Prérequis
Backend
Java 17, Spring Boot, Spring Cloud, Spring Security
Keycloak for Identity and Access Management
MySQL, JPA/Hibernate
Eureka Server, Spring Cloud Gateway
Frontend
Angular 16
Security dashboard
Machine Learning
K-means Clustering 
