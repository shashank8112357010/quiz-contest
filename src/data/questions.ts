export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation?: string;
  tags?: string[];
  points?: number;
}

export const questionDatabase: Record<string, Question[]> = {
  world: [
    {
      id: 1,
      question: "Which country has the largest population in the world?",
      options: ["India", "China", "United States", "Indonesia"],
      correctAnswer: 1,
      category: "World",
      difficulty: "Easy",
      explanation:
        "China has the world's largest population with over 1.4 billion people.",
      tags: ["geography", "population", "world-facts"],
      points: 10,
    },
    {
      id: 2,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: 2,
      category: "World",
      difficulty: "Medium",
      explanation:
        "Canberra is the capital city of Australia, not Sydney which is the largest city.",
      tags: ["geography", "capitals", "australia"],
      points: 15,
    },
    {
      id: 3,
      question: "Which country is known as the 'Land of the Rising Sun'?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correctAnswer: 1,
      category: "World",
      difficulty: "Easy",
      tags: ["geography", "nicknames", "japan"],
      points: 10,
    },
    {
      id: 4,
      question:
        "The Great Wall of China was built primarily to protect against invasions from which direction?",
      options: ["South", "East", "West", "North"],
      correctAnswer: 3,
      category: "World",
      difficulty: "Medium",
      tags: ["history", "china", "ancient"],
      points: 15,
    },
    {
      id: 5,
      question: "Which European country has the most time zones?",
      options: ["Russia", "France", "United Kingdom", "Spain"],
      correctAnswer: 1,
      category: "World",
      difficulty: "Hard",
    },
  ],

  animal: [
    {
      id: 1,
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Lion", "Elephant", "Leopard"],
      correctAnswer: 1,
      category: "Animal",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "How many hearts does an octopus have?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      category: "Animal",
      difficulty: "Medium",
    },
    {
      id: 3,
      question: "Which bird is known for its ability to mimic human speech?",
      options: ["Eagle", "Parrot", "Owl", "Peacock"],
      correctAnswer: 1,
      category: "Animal",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: 1,
      category: "Animal",
      difficulty: "Easy",
    },
    {
      id: 5,
      question: "Which animal can change its color to match its surroundings?",
      options: ["Chameleon", "Frog", "Snake", "Lizard"],
      correctAnswer: 0,
      category: "Animal",
      difficulty: "Easy",
    },
  ],

  gk: [
    {
      id: 1,
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
      category: "General Knowledge",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2,
      category: "General Knowledge",
      difficulty: "Medium",
    },
    {
      id: 3,
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      category: "General Knowledge",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 2,
      category: "General Knowledge",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "In Greek mythology, who is the king of the gods?",
      options: ["Poseidon", "Hades", "Apollo", "Zeus"],
      correctAnswer: 3,
      category: "General Knowledge",
      difficulty: "Medium",
    },
  ],

  history: [
    {
      id: 1,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      category: "History",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "Who was the first person to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
      correctAnswer: 1,
      category: "History",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "The ancient city of Pompeii was destroyed by which volcano?",
      options: ["Mount Etna", "Mount Vesuvius", "Stromboli", "Vulcano"],
      correctAnswer: 1,
      category: "History",
      difficulty: "Medium",
    },
    {
      id: 4,
      question: "Which empire was ruled by Julius Caesar?",
      options: [
        "Greek Empire",
        "Roman Empire",
        "Byzantine Empire",
        "Persian Empire",
      ],
      correctAnswer: 1,
      category: "History",
      difficulty: "Easy",
    },
    {
      id: 5,
      question: "The Berlin Wall fell in which year?",
      options: ["1987", "1988", "1989", "1990"],
      correctAnswer: 2,
      category: "History",
      difficulty: "Medium",
    },
  ],

  celebrity: [
    {
      id: 1,
      question: "Which actor played Iron Man in the Marvel Cinematic Universe?",
      options: [
        "Chris Evans",
        "Robert Downey Jr.",
        "Mark Ruffalo",
        "Chris Hemsworth",
      ],
      correctAnswer: 1,
      category: "Celebrity",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "Who is known as the 'Queen of Pop'?",
      options: ["Britney Spears", "Madonna", "Lady Gaga", "Whitney Houston"],
      correctAnswer: 1,
      category: "Celebrity",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Which celebrity couple is known as 'Brangelina'?",
      options: [
        "Brad Pitt & Jennifer Aniston",
        "Brad Pitt & Angelina Jolie",
        "George Clooney & Angelina Jolie",
        "Leonardo DiCaprio & Angelina Jolie",
      ],
      correctAnswer: 1,
      category: "Celebrity",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "Who directed the movie 'Titanic'?",
      options: [
        "Steven Spielberg",
        "James Cameron",
        "Christopher Nolan",
        "Martin Scorsese",
      ],
      correctAnswer: 1,
      category: "Celebrity",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "Which singer released the album 'Thriller'?",
      options: ["Elvis Presley", "Michael Jackson", "Prince", "David Bowie"],
      correctAnswer: 1,
      category: "Celebrity",
      difficulty: "Easy",
    },
  ],

  cricket: [
    {
      id: 1,
      question: "How many players are there in a cricket team?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 1,
      category: "Cricket",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "What is the maximum number of overs in a T20 match?",
      options: ["20", "25", "30", "50"],
      correctAnswer: 0,
      category: "Cricket",
      difficulty: "Easy",
    },
    {
      id: 3,
      question:
        "Who holds the record for the highest individual score in Test cricket?",
      options: ["Brian Lara", "Matthew Hayden", "Virat Kohli", "Don Bradman"],
      correctAnswer: 0,
      category: "Cricket",
      difficulty: "Hard",
    },
    {
      id: 4,
      question: "In which country was cricket first played?",
      options: ["Australia", "India", "England", "South Africa"],
      correctAnswer: 2,
      category: "Cricket",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "What does LBW stand for in cricket?",
      options: [
        "Long Ball Wide",
        "Leg Before Wicket",
        "Left Ball Wrong",
        "Low Ball Win",
      ],
      correctAnswer: 1,
      category: "Cricket",
      difficulty: "Medium",
    },
  ],

  banking: [
    {
      id: 1,
      question: "What does ATM stand for?",
      options: [
        "Automatic Teller Machine",
        "Automated Transaction Machine",
        "Advanced Technology Machine",
        "Automated Transfer Machine",
      ],
      correctAnswer: 0,
      category: "Banking",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "Which is the central bank of India?",
      options: [
        "State Bank of India",
        "Reserve Bank of India",
        "Bank of India",
        "Central Bank of India",
      ],
      correctAnswer: 1,
      category: "Banking",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "What is the full form of NEFT?",
      options: [
        "National Electronic Funds Transfer",
        "New Electronic Financial Transaction",
        "National Electronic Financial Transfer",
        "New Electronic Funds Transfer",
      ],
      correctAnswer: 0,
      category: "Banking",
      difficulty: "Medium",
    },
    {
      id: 4,
      question:
        "What is the maximum amount that can be withdrawn from an ATM in a day?",
      options: ["₹20,000", "₹25,000", "₹40,000", "Varies by bank"],
      correctAnswer: 3,
      category: "Banking",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "What does KYC stand for in banking?",
      options: [
        "Know Your Customer",
        "Keep Your Cash",
        "Know Your Credit",
        "Keep Your Customer",
      ],
      correctAnswer: 0,
      category: "Banking",
      difficulty: "Easy",
    },
  ],

  "current-affairs": [
    {
      id: 1,
      question: "Who is the current Prime Minister of India (as of 2024)?",
      options: [
        "Narendra Modi",
        "Rahul Gandhi",
        "Arvind Kejriwal",
        "Mamata Banerjee",
      ],
      correctAnswer: 0,
      category: "Current Affairs",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "Which country hosted the 2024 Olympics?",
      options: ["Japan", "France", "USA", "Australia"],
      correctAnswer: 1,
      category: "Current Affairs",
      difficulty: "Easy",
    },
    {
      id: 3,
      question:
        "What is the name of India's lunar mission that successfully landed on the moon's south pole?",
      options: [
        "Chandrayaan-1",
        "Chandrayaan-2",
        "Chandrayaan-3",
        "Mangalyaan",
      ],
      correctAnswer: 2,
      category: "Current Affairs",
      difficulty: "Medium",
    },
    {
      id: 4,
      question: "Which social media platform was rebranded to 'X' in 2023?",
      options: ["Facebook", "Instagram", "Twitter", "TikTok"],
      correctAnswer: 2,
      category: "Current Affairs",
      difficulty: "Easy",
    },
    {
      id: 5,
      question: "Who won the Nobel Peace Prize in 2023?",
      options: [
        "Narges Mohammadi",
        "Maria Ressa",
        "Dmitry Muratov",
        "World Food Programme",
      ],
      correctAnswer: 0,
      category: "Current Affairs",
      difficulty: "Hard",
    },
  ],

  computer: [
    {
      id: 1,
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Processing Unit",
        "Central Program Unit",
        "Computer Program Unit",
      ],
      correctAnswer: 0,
      category: "Computer",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "Which company developed the Windows operating system?",
      options: ["Apple", "Google", "Microsoft", "IBM"],
      correctAnswer: 2,
      category: "Computer",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language",
      ],
      correctAnswer: 0,
      category: "Computer",
      difficulty: "Medium",
    },
    {
      id: 4,
      question:
        "Which programming language is known as the 'mother of all languages'?",
      options: ["Java", "Python", "C", "Assembly"],
      correctAnswer: 2,
      category: "Computer",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "What is the smallest unit of data in a computer?",
      options: ["Bit", "Byte", "Kilobyte", "Megabyte"],
      correctAnswer: 0,
      category: "Computer",
      difficulty: "Easy",
    },
  ],

  sports: [
    {
      id: 1,
      question: "How often are the Summer Olympic Games held?",
      options: [
        "Every 2 years",
        "Every 3 years",
        "Every 4 years",
        "Every 5 years",
      ],
      correctAnswer: 2,
      category: "Sports",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "In which sport would you perform a slam dunk?",
      options: ["Football", "Basketball", "Tennis", "Volleyball"],
      correctAnswer: 1,
      category: "Sports",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Who has won the most Grand Slam tennis tournaments?",
      options: [
        "Roger Federer",
        "Rafael Nadal",
        "Novak Djokovic",
        "Serena Williams",
      ],
      correctAnswer: 2,
      category: "Sports",
      difficulty: "Medium",
    },
    {
      id: 4,
      question: "Which country has won the most FIFA World Cups?",
      options: ["Germany", "Argentina", "Brazil", "Italy"],
      correctAnswer: 2,
      category: "Sports",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "In golf, what is the term for one stroke under par?",
      options: ["Eagle", "Birdie", "Bogey", "Albatross"],
      correctAnswer: 1,
      category: "Sports",
      difficulty: "Medium",
    },
  ],

  science: [
    {
      id: 1,
      question: "What is the chemical formula for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correctAnswer: 0,
      category: "Science",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "What is the speed of light in vacuum?",
      options: [
        "299,792,458 m/s",
        "300,000,000 m/s",
        "299,999,999 m/s",
        "298,000,000 m/s",
      ],
      correctAnswer: 0,
      category: "Science",
      difficulty: "Hard",
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      category: "Science",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correctAnswer: 2,
      category: "Science",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "How many bones are there in an adult human body?",
      options: ["206", "208", "210", "212"],
      correctAnswer: 0,
      category: "Science",
      difficulty: "Medium",
    },
  ],

  geography: [
    {
      id: 1,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: 3,
      category: "Geography",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
      correctAnswer: 1,
      category: "Geography",
      difficulty: "Medium",
    },
    {
      id: 3,
      question: "What is the capital of Canada?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      correctAnswer: 2,
      category: "Geography",
      difficulty: "Medium",
    },
    {
      id: 4,
      question: "Which mountain range contains Mount Everest?",
      options: ["Andes", "Himalayas", "Rocky Mountains", "Alps"],
      correctAnswer: 1,
      category: "Geography",
      difficulty: "Easy",
    },
    {
      id: 5,
      question: "Which desert is the largest in the world?",
      options: ["Sahara", "Gobi", "Antarctica", "Arabian"],
      correctAnswer: 2,
      category: "Geography",
      difficulty: "Hard",
    },
  ],

  food: [
    {
      id: 1,
      question: "Which spice is derived from the Crocus flower?",
      options: ["Turmeric", "Saffron", "Cardamom", "Cinnamon"],
      correctAnswer: 1,
      category: "Food",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "What is the main ingredient in guacamole?",
      options: ["Tomato", "Avocado", "Onion", "Lime"],
      correctAnswer: 1,
      category: "Food",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Which country is famous for inventing pizza?",
      options: ["France", "Spain", "Italy", "Greece"],
      correctAnswer: 2,
      category: "Food",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "What type of pastry is used to make profiteroles?",
      options: [
        "Puff pastry",
        "Shortcrust pastry",
        "Choux pastry",
        "Filo pastry",
      ],
      correctAnswer: 2,
      category: "Food",
      difficulty: "Hard",
    },
    {
      id: 5,
      question: "Which fruit is known as the 'king of fruits'?",
      options: ["Mango", "Durian", "Pineapple", "Jackfruit"],
      correctAnswer: 1,
      category: "Food",
      difficulty: "Medium",
    },
  ],

  biology: [
    {
      id: 1,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      correctAnswer: 1,
      category: "Biology",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "What is the study of plants called?",
      options: ["Zoology", "Botany", "Ecology", "Anatomy"],
      correctAnswer: 1,
      category: "Biology",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Which blood type is known as the universal donor?",
      options: ["A", "B", "AB", "O"],
      correctAnswer: 3,
      category: "Biology",
      difficulty: "Medium",
    },
    {
      id: 4,
      question: "How many chambers does a human heart have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      category: "Biology",
      difficulty: "Easy",
    },
    {
      id: 5,
      question: "What is the largest organ in the human body?",
      options: ["Brain", "Liver", "Skin", "Lungs"],
      correctAnswer: 2,
      category: "Biology",
      difficulty: "Medium",
    },
  ],

  chemistry: [
    {
      id: 1,
      question: "What is the atomic number of carbon?",
      options: ["4", "6", "8", "12"],
      correctAnswer: 1,
      category: "Chemistry",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "What gas makes up approximately 78% of Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 2,
      category: "Chemistry",
      difficulty: "Medium",
    },
    {
      id: 3,
      question: "What is the pH of pure water?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1,
      category: "Chemistry",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "Which element has the chemical symbol 'Fe'?",
      options: ["Fluorine", "Iron", "Francium", "Fermium"],
      correctAnswer: 1,
      category: "Chemistry",
      difficulty: "Easy",
    },
    {
      id: 5,
      question: "What is the most abundant element in the universe?",
      options: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
      correctAnswer: 2,
      category: "Chemistry",
      difficulty: "Medium",
    },
  ],

  physics: [
    {
      id: 1,
      question: "What is the unit of force in the SI system?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      correctAnswer: 1,
      category: "Physics",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "9.6 m/s²", "10 m/s²", "8.9 m/s²"],
      correctAnswer: 0,
      category: "Physics",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Who developed the theory of relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Galileo Galilei",
        "Stephen Hawking",
      ],
      correctAnswer: 1,
      category: "Physics",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "What is the speed of sound in air at room temperature?",
      options: ["330 m/s", "343 m/s", "360 m/s", "300 m/s"],
      correctAnswer: 1,
      category: "Physics",
      difficulty: "Hard",
    },
    {
      id: 5,
      question: "What particle is responsible for electromagnetic force?",
      options: ["Photon", "Electron", "Proton", "Neutron"],
      correctAnswer: 0,
      category: "Physics",
      difficulty: "Hard",
    },
  ],

  "english-literature": [
    {
      id: 1,
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain",
      ],
      correctAnswer: 1,
      category: "English Literature",
      difficulty: "Easy",
    },
    {
      id: 2,
      question:
        "Which novel begins with 'It was the best of times, it was the worst of times'?",
      options: [
        "Great Expectations",
        "Oliver Twist",
        "A Tale of Two Cities",
        "David Copperfield",
      ],
      correctAnswer: 2,
      category: "English Literature",
      difficulty: "Medium",
    },
    {
      id: 3,
      question: "Who wrote '1984'?",
      options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
      correctAnswer: 0,
      category: "English Literature",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "In which Shakespeare play does the character Iago appear?",
      options: ["Hamlet", "Macbeth", "Othello", "King Lear"],
      correctAnswer: 2,
      category: "English Literature",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "Who wrote 'Pride and Prejudice'?",
      options: [
        "Charlotte Brontë",
        "Emily Brontë",
        "Jane Austen",
        "George Eliot",
      ],
      correctAnswer: 2,
      category: "English Literature",
      difficulty: "Easy",
    },
  ],

  brand: [
    {
      id: 1,
      question: "What is the slogan of Nike?",
      options: [
        "I'm Lovin' It",
        "Just Do It",
        "Think Different",
        "Have a Break",
      ],
      correctAnswer: 1,
      category: "Brand",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "Which company uses the tagline 'Think Different'?",
      options: ["Microsoft", "Google", "Apple", "Samsung"],
      correctAnswer: 2,
      category: "Brand",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "What is McDonald's famous slogan?",
      options: [
        "Have It Your Way",
        "I'm Lovin' It",
        "Finger Lickin' Good",
        "Eat Fresh",
      ],
      correctAnswer: 1,
      category: "Brand",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "Which car company's logo features four interlocking rings?",
      options: ["BMW", "Mercedes", "Audi", "Volkswagen"],
      correctAnswer: 2,
      category: "Brand",
      difficulty: "Easy",
    },
    {
      id: 5,
      question: "What does the 'M' in 3M stand for?",
      options: ["Mining", "Minnesota", "Manufacturing", "All of the above"],
      correctAnswer: 3,
      category: "Brand",
      difficulty: "Hard",
    },
  ],

  astronomy: [
    {
      id: 1,
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      correctAnswer: 2,
      category: "Astronomy",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "How many moons does Jupiter have?",
      options: ["79", "82", "95", "67"],
      correctAnswer: 2,
      category: "Astronomy",
      difficulty: "Hard",
    },
    {
      id: 3,
      question: "What is the name of our galaxy?",
      options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
      correctAnswer: 1,
      category: "Astronomy",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "Which planet has the largest rings?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctAnswer: 1,
      category: "Astronomy",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "What is a supernova?",
      options: ["A new star", "An exploding star", "A black hole", "A planet"],
      correctAnswer: 1,
      category: "Astronomy",
      difficulty: "Medium",
    },
  ],

  psychology: [
    {
      id: 1,
      question: "Who is considered the father of psychoanalysis?",
      options: ["Carl Jung", "Sigmund Freud", "B.F. Skinner", "Ivan Pavlov"],
      correctAnswer: 1,
      category: "Psychology",
      difficulty: "Easy",
    },
    {
      id: 2,
      question: "What does IQ stand for?",
      options: [
        "Intelligence Query",
        "Intelligence Quotient",
        "Intellectual Quality",
        "Intelligence Question",
      ],
      correctAnswer: 1,
      category: "Psychology",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "Which part of the brain is responsible for memory formation?",
      options: ["Cerebellum", "Hippocampus", "Medulla", "Thalamus"],
      correctAnswer: 1,
      category: "Psychology",
      difficulty: "Medium",
    },
    {
      id: 4,
      question: "What is the term for the fear of heights?",
      options: ["Claustrophobia", "Arachnophobia", "Acrophobia", "Agoraphobia"],
      correctAnswer: 2,
      category: "Psychology",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "Who developed the hierarchy of needs theory?",
      options: ["Abraham Maslow", "Carl Rogers", "Erik Erikson", "Jean Piaget"],
      correctAnswer: 0,
      category: "Psychology",
      difficulty: "Medium",
    },
  ],
};

export const getRandomQuestions = (
  categoryId: string,
  count: number = 10,
  userId?: string,
): Question[] => {
  const categoryQuestions = questionDatabase[categoryId] || [];

  if (categoryQuestions.length === 0) {
    // Fallback to general knowledge if category not found
    const fallbackQuestions = questionDatabase.gk || [];
    if (fallbackQuestions.length === 0) {
      return generateDefaultQuestions(count);
    }
    return ensureQuestionProperties(fallbackQuestions.slice(0, count));
  }

  // Create user-specific seed for consistent but different question sets
  const userSeed = userId ? hashString(userId) : Date.now();
  const dailySeed = new Date().toDateString();
  const combinedSeed = hashString(userSeed + dailySeed + categoryId);

  // Seeded random function for consistent randomization per user per day
  const seededRandom = createSeededRandom(combinedSeed);

  // Shuffle questions using seeded random for dynamic user-specific sets
  const shuffled = [...categoryQuestions].sort(() => seededRandom() - 0.5);
  const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
  return ensureQuestionProperties(selectedQuestions);
};

// Simple hash function for creating seeds
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Seeded random number generator for consistent user-specific randomization
const createSeededRandom = (seed: number) => {
  let m = 0x80000000; // 2^31
  let a = 1103515245;
  let c = 12345;
  let state = seed ? seed : Math.floor(Math.random() * (m - 1));

  return function () {
    state = (a * state + c) % m;
    return state / (m - 1);
  };
};

// Ensure all questions have required properties
const ensureQuestionProperties = (questions: Question[]): Question[] => {
  return questions.map((question) => ({
    ...question,
    tags: question.tags || [
      `${question.category.toLowerCase()}`,
      question.difficulty.toLowerCase(),
    ],
    points:
      question.points ||
      (question.difficulty === "Easy"
        ? 10
        : question.difficulty === "Medium"
          ? 15
          : 20),
    explanation:
      question.explanation ||
      `This is a ${question.difficulty.toLowerCase()} ${question.category} question.`,
  }));
};

// Generate default questions when database is empty
const generateDefaultQuestions = (count: number): Question[] => {
  const defaultQuestions: Question[] = [
    {
      id: 1,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      category: "Mathematics",
      difficulty: "Easy",
      explanation: "2 + 2 equals 4. This is basic arithmetic.",
      tags: ["math", "basic", "arithmetic"],
      points: 10,
    },
    {
      id: 2,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      category: "Geography",
      difficulty: "Easy",
      explanation: "Paris is the capital and largest city of France.",
      tags: ["geography", "capitals", "europe"],
      points: 10,
    },
    {
      id: 3,
      question: "What year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      category: "History",
      difficulty: "Medium",
      explanation: "World War II ended in 1945 with the surrender of Japan.",
      tags: ["history", "war", "20th-century"],
      points: 15,
    },
    {
      id: 4,
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Neptune"],
      correctAnswer: 1,
      category: "Science",
      difficulty: "Easy",
      explanation: "Jupiter is the largest planet in our solar system.",
      tags: ["science", "astronomy", "planets"],
      points: 10,
    },
    {
      id: 5,
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain",
      ],
      correctAnswer: 1,
      category: "Literature",
      difficulty: "Easy",
      explanation:
        "William Shakespeare wrote the famous tragedy 'Romeo and Juliet'.",
      tags: ["literature", "shakespeare", "drama"],
      points: 10,
    },
  ];

  // Repeat questions if needed to reach the requested count
  const result: Question[] = [];
  for (let i = 0; i < count; i++) {
    const baseQuestion = defaultQuestions[i % defaultQuestions.length];
    result.push({
      ...baseQuestion,
      id: i + 1,
    });
  }

  return result;
};

export const getAllCategories = (): string[] => {
  return Object.keys(questionDatabase);
};
