
import { Injectable } from '@angular/core';
import { QuestionPaper } from '../models/paper.model';

@Injectable({ providedIn: 'root' })
export class PaperDataService {
  getSciencePaper(): QuestionPaper {
    return {
      id: 'SSC-SCI-1-2024',
      subject: 'Science and Technology - Part 1',
      title: 'SSC Board Examination',
      totalMarks: 40,
      totalPages: 10,
      duration: '2 Hours',
      instructions: [
        'All questions are compulsory.',
        'Draw neat and labelled diagrams wherever necessary.',
        'Start each main question on a new page.',
        'Figures to the right indicate full marks.',
        'For each MCQ, the correct alternative answer must be written along with its sub-question number.',
      ],
      pages: [
        // Page 1: Title and Instructions
        {
          pageNumber: 1,
          content: [
            {
              title: 'General Instructions',
              instructions: 'Read all instructions carefully before starting.',
              questions: [],
            },
          ],
        },
        // Page 2: Section A - Q.1 (A) MCQs
        {
          pageNumber: 2,
          content: [
            {
              title: 'SECTION A',
              instructions: '',
              questions: [
                {
                  id: '1A1',
                  text: 'Q.1 (A) Choose the correct alternative. (5 Marks)',
                  marks: 5,
                  type: 'long',
                  subQuestions: [
                    {
                      id: '1A1a',
                      text: 'The gravitational force between two particles is F. If the mass of each particle is doubled and the distance between them is halved, the force between them will be:',
                      options: ['F/4', '4F', '8F', '16F'],
                      marks: 1,
                      type: 'mcq'
                    },
                    {
                      id: '1A1b',
                      text: 'According to Mendeleev\'s periodic law, properties of elements are a periodic function of their ______.',
                      options: ['atomic numbers', 'atomic masses', 'densities', 'melting points'],
                      marks: 1,
                      type: 'mcq'
                    },
                  ]
                }
              ]
            }
          ]
        },
        // Page 3: Section A - Q.1 (A) MCQs continued
        {
          pageNumber: 3,
          content: [
            {
              title: 'SECTION A (Contd.)',
              instructions: '',
              questions: [
                {
                  id: '1A1c',
                  text: 'The human eye can focus on objects at different distances by adjusting the focal length of the eye lens. This is due to ____.',
                  options: ['presbyopia', 'accommodation', 'near-sightedness', 'far-sightedness'],
                  marks: 1,
                  type: 'mcq'
                },
                {
                  id: '1A1d',
                  text: 'Which of the following is a saturated hydrocarbon?',
                  options: ['Ethene', 'Ethyne', 'Ethane', 'Benzene'],
                  marks: 1,
                  type: 'mcq'
                },
                {
                  id: '1A1e',
                  text: 'The device used for producing electric current is called a ______.',
                  options: ['generator', 'galvanometer', 'ammeter', 'motor'],
                  marks: 1,
                  type: 'mcq'
                }
              ]
            }
          ]
        },
        // Page 4: Section A - Q.1 (B)
        {
          pageNumber: 4,
          content: [
            {
              title: 'SECTION A (Contd.)',
              instructions: '',
              questions: [
                {
                  id: '1B',
                  text: 'Q.1 (B) Answer the following. (5 Marks)',
                  marks: 5,
                  type: 'long',
                  subQuestions: [
                    { id: '1B1', text: 'State Kepler\'s first law of planetary motion.', marks: 1, type: 'short' },
                    { id: '1B2', text: 'Find the odd one out: Iodine, Bromine, Chlorine, Neon.', marks: 1, type: 'short' },
                    { id: '1B3', text: 'What is the SI unit of potential difference?', marks: 1, type: 'short' },
                    { id: '1B4', text: 'Write the structural formula of propane.', marks: 1, type: 'short' },
                    { id: '1B5', text: 'True or False: A concave lens is a converging lens.', marks: 1, type: 'short' }
                  ]
                }
              ]
            }
          ]
        },
        // Page 5: Section B - Q.2 (Any 5)
        {
          pageNumber: 5,
          content: [
            {
              title: 'SECTION B',
              instructions: '',
              questions: [
                {
                  id: '2A',
                  text: 'Q.2 (A) Give scientific reasons (Any two). (4 Marks)',
                  marks: 4,
                  type: 'long',
                  subQuestions: [
                    { id: '2A1', text: 'Stars twinkle but planets do not.', marks: 2, type: 'long'},
                    { id: '2A2', text: 'Elements belonging to the same group have the same valency.', marks: 2, type: 'long'},
                    { id: '2A3', text: 'It is recommended to use a fuse of proper rating in an electrical circuit.', marks: 2, type: 'long'},
                  ]
                }
              ]
            }
          ]
        },
        // Page 6: Section B - Q.2 (B) (Any 3)
        {
          pageNumber: 6,
          content: [
            {
              title: 'SECTION B (Contd.)',
              instructions: '',
              questions: [
                 {
                  id: '2B',
                  text: 'Q.2 (B) Answer the following (Any three). (6 Marks)',
                  marks: 6,
                  type: 'long',
                  subQuestions: [
                    { id: '2B1', text: 'An object takes 5 s to reach the ground from a height of 5 m on a planet. What is the value of g on the planet?', marks: 2, type: 'long' },
                    { id: '2B2', text: 'Explain the rules used for drawing ray diagrams for the formation of an image by a convex lens.', marks: 2, type: 'long' },
                    { id: '2B3', text: 'Define endothermic and exothermic reactions with one example each.', marks: 2, type: 'long' },
                    { id: '2B4', text: 'What is a homologous series? Write any two characteristics of it.', marks: 2, type: 'long' }
                  ]
                }
              ]
            }
          ]
        },
         // Page 7: Section C - Q.3 (Any 5)
        {
          pageNumber: 7,
          content: [
            {
              title: 'SECTION C',
              instructions: '',
              questions: [
                {
                  id: '3',
                  text: 'Q.3 Answer the following (Any five). (15 Marks)',
                  marks: 15,
                  type: 'long',
                  subQuestions: [
                    { id: '3A', text: 'State and explain Newton\'s universal law of gravitation.', marks: 3, type: 'long'},
                    { id: '3B', text: 'Draw a neat labeled diagram of the human eye and explain the function of the retina.', marks: 3, type: 'long'},
                    { id: '3C', text: 'Explain the phenomenon of dispersion of white light through a glass prism.', marks: 3, type: 'long'}
                  ]
                }
              ]
            }
          ]
        },
        // Page 8: Section C (Contd.)
        {
          pageNumber: 8,
          content: [
            {
              title: 'SECTION C (Contd.)',
              instructions: '',
              questions: [
                { id: '3D', text: 'What are covalent bonds? Explain the formation of a methane molecule (CH4).', marks: 3, type: 'long'},
                { id: '3E', text: 'Explain Fleming\'s Left-Hand Rule with a suitable diagram.', marks: 3, type: 'long'},
                { id: '3F', text: 'Distinguish between soaps and detergents.', marks: 3, type: 'long'},
                { id: '3G', text: 'A person needs a lens of power -5.5 dioptres for correcting his distant vision. What is the focal length of the lens required?', marks: 3, type: 'long'}
              ]
            }
          ]
        },
        // Page 9: Section D - Q.4 (Any 1)
        {
          pageNumber: 9,
          content: [
            {
              title: 'SECTION D',
              instructions: '',
              questions: [
                {
                  id: '4',
                  text: 'Q.4 Answer any one of the following. (5 Marks)',
                  marks: 5,
                  type: 'long',
                  subQuestions: [
                    { id: '4A', text: 'Explain the construction and working of an electric motor with a neat labeled diagram. State the principle on which it works.', marks: 5, type: 'long'},
                    { id: '4B', text: 'What is meant by the modern periodic table? Explain its structure and the trends in atomic size and metallic character across a period and down a group.', marks: 5, type: 'long'}
                  ]
                }
              ]
            }
          ]
        },
        // Page 10: Rough Work
        {
          pageNumber: 10,
          content: [
            {
              title: 'ROUGH WORK',
              instructions: '',
              questions: [],
            },
          ],
        },
      ],
    };
  }
}
