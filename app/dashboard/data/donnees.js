// app/dashboard/data/donnees.js

export const donnees = [
  {
    identite: {
      id: 1,
      nom: "Tchouameni",
      prenom: "Martine",
      dateNaissance: "1987-06-22",
      age: 38,
      sexe: "Femme",
      numeroPatient: "PAT-CM-2025-001",
      adresse: "Quartier Makepe, Douala",
      telephone: "+237 6 99 45 23 11",
      email: "martine.tchouameni@gmail.com",
      profession: "Infirmière",
      situationFamiliale: "Mariée",
      nombreEnfants: 3
    },
    parametres: {
      poids: 72,
      taille: 168,
      imc: 25.5,
      groupeSanguin: "O+",
      allergies: ["Pénicilline"]
    },
    clinique: {
      motif: "Dyspnée d’effort et œdèmes des membres inférieurs",
      symptomes: ["Essoufflement à la marche", "Œdèmes bilatéraux", "Fatigue"],
      signesVitaux: {
        tension: "150/95",
        frequenceCardiaque: 88,
        temperature: 36.8,
        saturation: 96
      }
    },
    diagnostic: {
      principal: "Insuffisance cardiaque droite",
      secondaires: ["Hypertension artérielle", "Anémie ferriprive"],
      cie10: "I50.0"
    }
  },
  {
    identite: {
      id: 2,
      nom: "Nga",
      prenom: "Jean-Paul",
      dateNaissance: "1979-11-03",
      age: 46,
      sexe: "Homme",
      numeroPatient: "PAT-CM-2025-002",
      adresse: "Carrefour Emia, Yaoundé",
      telephone: "+237 6 77 12 89 45",
      email: "jpnga79@yahoo.fr",
      profession: "Chauffeur de taxi",
      situationFamiliale: "Marié",
      nombreEnfants: 5
    },
    parametres: {
      poids: 85,
      taille: 172,
      imc: 28.7,
      groupeSanguin: "B+",
      allergies: ["Aucune"]
    },
    clinique: {
      motif: "Douleur abdominale intense",
      symptomes: ["Douleur épigastrique irradiant dans le dos", "Nausées", "Vomissements"],
      signesVitaux: {
        tension: "110/70",
        frequenceCardiaque: 105,
        temperature: 38.1,
        saturation: 97
      }
    },
    diagnostic: {
      principal: "Pancréatite aiguë",
      secondaires: ["Hypertriglycéridémie"],
      cie10: "K85.9"
    }
  },
  {
    identite: {
      id: 3,
      nom: "Mbarga",
      prenom: "Émilienne",
      dateNaissance: "1995-02-14",
      age: 30,
      sexe: "Femme",
      numeroPatient: "PAT-CM-2025-003",
      adresse: "New-Bell, Douala",
      telephone: "+237 6 94 33 67 89",
      email: "",
      profession: "Commerçante (marché central)",
      situationFamiliale: "Célibataire",
      nombreEnfants: 2
    },
    parametres: {
      poids: 78,
      taille: 160,
      imc: 30.5,
      groupeSanguin: "A+",
      allergies: ["Aucune connue"]
    },
    clinique: {
      motif: "Fièvre et douleurs lombaires",
      symptomes: ["Fièvre à 39°C", "Brûlures mictionnelles", "Frissons"],
      signesVitaux: {
        tension: "125/80",
        frequenceCardiaque: 110,
        temperature: 39.2,
        saturation: 98
      }
    },
    diagnostic: {
      principal: "Pyélonéphrite aiguë",
      secondaires: ["Grossesse 28 SA (suivie)"],
      cie10: "N10"
    }
  },
  {
    identite: {
      id: 4,
      nom: "Fouda",
      prenom: "Pierre",
      dateNaissance: "1968-09-30",
      age: 57,
      sexe: "Homme",
      numeroPatient: "PAT-CM-2025-004",
      adresse: "Biyem-Assi, Yaoundé",
      telephone: "+237 6 90 18 44 22",
      email: "pierre.fouda68@gmail.com",
      profession: "Fonctionnaire (Ministère des Finances)",
      situationFamiliale: "Veuf",
      nombreEnfants: 4
    },
    parametres: {
      poids: 92,
      taille: 175,
      imc: 30.0,
      groupeSanguin: "AB+",
      allergies: ["Aspirine (asthme induit)"]
    },
    clinique: {
      motif: "Céphalées et vertiges",
      symptomes: ["Hypertension non contrôlée", "Bourdonnements d’oreilles"],
      signesVitaux: {
        tension: "190/110",
        frequenceCardiaque: 82,
        temperature: 36.6,
        saturation: 95
      }
    },
    diagnostic: {
      principal: "Crise hypertensive",
      secondaires: ["HTA grade 3", "Diabète type 2"],
      cie10: "I10"
    }
  },
  {
    identite: {
      id: 5,
      nom: "Ngo",
      prenom: "Carine",
      dateNaissance: "2001-07-19",
      age: 24,
      sexe: "Femme",
      numeroPatient: "PAT-CM-2025-005",
      adresse: "Deido, Douala",
      telephone: "+237 6 51 29 87 33",
      email: "carine.ngo2001@gmail.com",
      profession: "Étudiante en médecine (5ème année)",
      situationFamiliale: "Célibataire",
      nombreEnfants: 0
    },
    parametres: {
      poids: 58,
      taille: 170,
      imc: 20.1,
      groupeSanguin: "O-",
      allergies: ["Acariens", "Pollens"]
    },
    clinique: {
      motif: "Paludisme récurrent",
      symptomes: ["Fièvre cyclique", "Céphalées", "Courbatures"],
      signesVitaux: {
        tension: "100/65",
        frequenceCardiaque: 98,
        temperature: 38.9,
        saturation: 97
      }
    },
    diagnostic: {
      principal: "Accès palustre à Plasmodium falciparum",
      secondaires: ["Anémie modérée"],
      cie10: "B50.9"
    }
  },
  {
    identite: {
      id: 6,
      nom: "Eto’o",
      prenom: "Samuel",
      dateNaissance: "1992-04-05",
      age: 33,
      sexe: "Homme",
      numeroPatient: "PAT-CM-2025-006",
      adresse: "Bonamoussadi, Douala",
      telephone: "+237 6 98 77 55 44",
      email: "samueletoo92@gmail.com",
      profession: "Entrepreneur (import-export)",
      situationFamiliale: "Marié",
      nombreEnfants: 2
    },
    parametres: {
      poids: 80,
      taille: 178,
      imc: 25.2,
      groupeSanguin: "A+",
      allergies: ["Aucune"]
    },
    clinique: {
      motif: "Traumatisme du genou droit",
      symptomes: ["Douleur intense", "Gonflement", "Impossibilité d’appui"],
      signesVitaux: {
        tension: "130/85",
        frequenceCardiaque: 90,
        temperature: 37.0,
        saturation: 99
      }
    },
    diagnostic: {
      principal: "Rupture du ligament croisé antérieur",
      secondaires: ["Lésion méniscale interne"],
      cie10: "S83.5"
    }
  },
  {
    identite: {
      id: 7,
      nom: "Mballa",
      prenom: "Thérèse",
      dateNaissance: "1975-12-12",
      age: 49,
      sexe: "Femme",
      numeroPatient: "PAT-CM-2025-007",
      adresse: "Mvan, Yaoundé",
      telephone: "+237 6 82 34 56 78",
      email: "",
      profession: "Institutrice",
      situationFamiliale: "Divorcée",
      nombreEnfants: 3
    },
    parametres: {
      poids: 88,
      taille: 162,
      imc: 33.5,
      groupeSanguin: "B+",
      allergies: ["Sulfamides"]
    },
    clinique: {
      motif: "Douleurs articulaires diffuses",
      symptomes: ["Raideur matinale >1h", "Douleurs poignets et genoux"],
      signesVitaux: {
        tension: "135/88",
        frequenceCardiaque: 76,
        temperature: 36.7,
        saturation: 98
      }
    },
    diagnostic: {
      principal: "Polyarthrite rhumatoïde séropositive",
      secondaires: ["Syndrome du canal carpien bilatéral"],
      cie10: "M05.9"
    }
  }
];