// support.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit {
  showTicketForm: boolean = false;
  
  // Liste des questions fréquemment posées
  faqs = [
    {
      question: 'Comment puis-je réinitialiser mon mot de passe ?',
      answer: 'Vous pouvez réinitialiser votre mot de passe en cliquant sur "Mot de passe oublié" sur la page de connexion.'
    },
    {
      question: 'Comment mettre à jour mes informations personnelles ?',
      answer: 'Accédez à votre profil en cliquant sur votre nom d\'utilisateur en haut à droite, puis sélectionnez "Paramètres du compte".'
    },
    {
      question: 'Est-ce que je peux annuler mon abonnement ?',
      answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis la section "Abonnements" dans les paramètres de votre compte.'
    },
    {
      question: 'Comment contacter le service client ?',
      answer: 'Vous pouvez contacter notre service client en créant un ticket de support ci-dessous.'
    },
    {
      question: 'Quels sont les horaires du support technique ?',
      answer: 'Notre support technique est disponible du lundi au vendredi de 9h à 18h.'
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
    // Initialisation si nécessaire
  }
  
  toggleTicketForm(): void {
    this.showTicketForm = !this.showTicketForm;
  }
}