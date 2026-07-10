/**
 * Wilderness First Aid - default content.
 *
 * This is the built-in reference data transcribed from the course notes.
 * The app loads this as the default. Any edits you make in the app are stored
 * separately in your browser (localStorage) and layered on top of this data,
 * so this file always stays as the clean, original reference.
 */
window.WFA_DEFAULT_DATA = {
  meta: {
    title: "Wilderness First Aid",
    version: 1
  },

  // ---------------------------------------------------------------------------
  // PATIENT ASSESSMENT - step-by-step reference (searchable free text)
  // ---------------------------------------------------------------------------
  assessments: [
    {
      id: "overview",
      title: "Overview",
      keywords: ["overview", "order", "patient assessment", "steps"],
      sections: [
        {
          heading: "Patient Assessment order",
          diagram: {
            type: "pyramid",
            tiers: [
              "Scene Size-Up (STERI)",
              "Primary Assessment (ABCDE)",
              "Secondary Assessment",
              "Management",
              "Ongoing Assessment"
            ]
          },
          items: [
            "Scene Size-Up (STERI)",
            "Primary Assessment (ABCDE)",
            "Secondary Assessment (Vital Signs, History, Physical Exam)",
            "Management",
            "Ongoing Assessment"
          ]
        }
      ]
    },
    {
      id: "size-up",
      title: "Scene Size-Up (STERI)",
      keywords: ["steri", "safety", "terrain", "environment", "resources", "impression", "scene"],
      sections: [
        {
          heading: "STERI",
          items: [
            "S - Safety",
            "T - Terrain",
            "E - Environment",
            "R - Resources",
            "I - Impression"
          ]
        },
        {
          heading: "S - Safety",
          items: [
            "Is the scene safe for you, the patient & bystanders?",
            "Scan for hazards - rockfall, traffic, wildlife, water, weather, unstable ground - before approaching."
          ]
        },
        {
          heading: "T - Terrain",
          items: [
            "Note the ground & access: steep, loose, wet or exposed terrain.",
            "It affects how you reach, treat & evacuate the patient."
          ]
        },
        {
          heading: "E - Environment",
          items: [
            "Weather & conditions - heat, cold, rain, wind, altitude - that threaten patient & rescuers.",
            "Plan protection from the elements early."
          ]
        },
        {
          heading: "R - Resources",
          items: [
            "What & who do you have: people, gear, first-aid supplies, communication & evacuation options?",
            "Call for additional help early if you may need it."
          ]
        },
        {
          heading: "I - Impression",
          items: [
            "Form a general impression: Mechanism of Injury (MOI) or Nature of Illness (NOI).",
            "Count the number of patients & gauge overall severity."
          ]
        }
      ]
    },
    {
      id: "primary",
      title: "Primary Assessment (ABCDE)",
      keywords: ["consent", "airway", "breathing", "circulation", "disability", "environment", "blood sweep"],
      sections: [
        {
          heading: "ABCDE",
          items: [
            "A - Airway",
            "B - Breathing",
            "C - Circulation",
            "D - Disability",
            "E - Environment"
          ]
        },
        {
          heading: "Start with consent",
          items: [
            "Tell your name & that you are trained in Wilderness First Aid.",
            "Ask if you can help them.",
            "Ask their name & how they prefer to be addressed."
          ]
        },
        {
          heading: "A - Airway",
          items: [
            "Assess for & correct any airway issues.",
            "Open the mouth & tilt the head slightly up.",
            "Remove anything choking the patient.",
            "If the patient is talking without effort, the airway is clear."
          ]
        },
        {
          heading: "B - Breathing",
          items: [
            "Assess for & correct any breathing issues.",
            "Ask if they have problems breathing or shortness of breath."
          ]
        },
        {
          heading: "C - Circulation",
          items: [
            "Perform a blood sweep to find & stop bleeding."
          ]
        },
        {
          heading: "D - Disability",
          items: [
            "Screen for brain dysfunction, spinal injury or injured limb function."
          ]
        },
        {
          heading: "E - Environment",
          items: [
            "Isolate the patient from the environment.",
            "Insulation between patient & the ground."
          ]
        }
      ]
    },
    {
      id: "history",
      title: "Secondary Assessment (SAMPLE)",
      keywords: ["sample", "signs", "symptoms", "allergies", "medications", "past medical", "last ins and outs", "events"],
      sections: [
        {
          heading: "SAMPLE",
          items: [
            "S - Signs & Symptoms",
            "A - Allergies",
            "M - Medications",
            "P - Past or Present Medical Problems",
            "L - Last In's and Out's",
            "E - Events leading up to current complaint/problem"
          ]
        },
        {
          heading: "S - Signs & Symptoms",
          items: [
            "Symptoms felt by patient - pain, nausea, dizziness, etc.",
            "Signs observed or measured - pale skin, blood pressure, fever, etc."
          ]
        },
        {
          heading: "A - Allergies",
          items: [
            "Drugs, food & other allergies.",
            "Knowing this prevents unknowingly sending patients into anaphylactic shock."
          ]
        },
        {
          heading: "M - Medications",
          items: [
            "Insight into ongoing medical problems & current state of health."
          ]
        },
        {
          heading: "P - Past/Present Medical Problems",
          items: [
            "May be directly related to the complaint or may adjust treatment/evacuation decision.",
            "Ex - Diabetic patients have higher probability of wound infections, frostbite, hypothermia & dehydration."
          ]
        },
        {
          heading: "L - Last In's and Out's",
          items: [
            "Last time patient ate or drank & last urination & bowel movement.",
            "When did you last eat or drink? When did you last use the bathroom? Was anything abnormal?"
          ]
        },
        {
          heading: "E - Events",
          items: [
            "Asking the patient to clarify in detail can reveal missed info & other concerns.",
            "Falls are a great example: did the patient fall because they tripped or because they fainted?",
            "From standing on soft grass or from 20 meters onto hard rock?"
          ]
        }
      ]
    },
    {
      id: "pain",
      title: "Pain Assessment (OPQRST)",
      keywords: ["opqrst", "onset", "provocation", "palliates", "quality", "radiation", "severity", "time", "pain"],
      sections: [
        {
          heading: "OPQRST",
          items: [
            "O - Onset",
            "P - Provocation / Palliation",
            "Q - Quality",
            "R - Radiation",
            "S - Severity",
            "T - Time"
          ]
        },
        {
          heading: "O - Onset",
          items: [
            "What were you doing when the pain started?",
            "Did it come on suddenly or gradually?"
          ]
        },
        {
          heading: "P - Provocation / Palliation",
          items: [
            "What makes the pain worse or better - movement, rest, pressure, position?"
          ]
        },
        {
          heading: "Q - Quality",
          items: [
            "How does it feel - sharp, dull, burning, crushing, cramping?",
            "Let the patient describe it in their own words."
          ]
        },
        {
          heading: "R - Radiation",
          items: [
            "Does the pain stay in one place or move / spread anywhere else?"
          ]
        },
        {
          heading: "S - Severity",
          items: [
            "Rate the pain 0–10 & note how much it limits activity.",
            "Recheck over time to see if it's improving or worsening."
          ]
        },
        {
          heading: "T - Time",
          items: [
            "When did it start & how has it changed since?",
            "Is it constant, or does it come & go?"
          ]
        }
      ]
    },
    {
      id: "vitals",
      title: "Vital Signs (AVPU)",
      keywords: ["avpu", "level of consciousness", "alert", "verbal", "pain", "unresponsive", "vitals"],
      sections: [
        {
          heading: "AVPU",
          items: [
            "A - Alert & Oriented",
            "V - Verbal",
            "P - Pain",
            "U - Unresponsive"
          ]
        },
        {
          heading: "A - Alert & Oriented",
          items: [
            "Alert & Oriented (A&O). A&O x4: Place (where), Person (who), Time (relative idea), Event (what happened)."
          ]
        },
        {
          heading: "V - Verbal",
          items: [
            "Is the patient responding in any way to verbal stimuli?"
          ]
        },
        {
          heading: "P - Pain",
          items: [
            "Patients not responding to verbal stimuli may respond to painful stimuli (a small pinch, not extreme)."
          ]
        },
        {
          heading: "U - Unresponsive",
          items: [
            "No response to verbal or painful stimuli."
          ]
        },
        {
          heading: "Notes",
          items: [
            "Take vital signs multiple times to see if the patient is getting better or worse."
          ]
        }
      ]
    },
    {
      id: "evacuation",
      title: "Evacuation Decision",
      keywords: ["evacuation", "evacuate", "decision"],
      sections: [
        {
          heading: "Most significant details to consider",
          items: [
            "Time",
            "Patient Condition",
            "Risk to others",
            "Cost",
            "Threats to life or limb",
            "Treatment requirements",
            "Consequences of particular actions or inaction",
            "The patient's history",
            "Your comfortability & skills",
            "Terrain, environment & other obstacles"
          ]
        }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // KEY CONCEPTS - foundational terms & measurements
  // ---------------------------------------------------------------------------
  concepts: [
    {
      id: "perfusion",
      title: "Perfusion",
      keywords: ["perfusion", "oxygen", "nutrients", "cells"],
      sections: [
        {
          heading: "Perfusion",
          items: [
            "Perfusion is oxygen & other vital nutrients reaching the body's cells.",
            "Every cell needs adequate perfusion to survive & function."
          ]
        }
      ]
    },
    {
      id: "shock",
      title: "Shock",
      keywords: ["shock", "perfusion", "inadequate", "secondary"],
      sections: [
        {
          heading: "Shock",
          items: [
            "Shock is inadequate perfusion.",
            "It doesn't occur spontaneously - it is always secondary to its cause, so treat the cause."
          ]
        }
      ]
    },
    {
      id: "bleeding",
      title: "Bleeding",
      keywords: ["bleeding", "capillary", "venous", "arterial", "hemorrhage", "blood"],
      sections: [
        {
          heading: "Why bleeding matters",
          items: [
            "Bleeding leads to less blood, which means less oxygen delivered to the body, leading to shock."
          ]
        },
        {
          heading: "Types of bleeds",
          items: [
            "Capillary - slow oozing from small vessels; usually easy to control.",
            "Venous - steady, darker red flow.",
            "Arterial - bright red & spurting with the pulse; the most serious."
          ]
        }
      ]
    },
    {
      id: "tourniquets",
      title: "Tourniquets",
      keywords: ["tourniquet", "windlass", "bleeding", "limb"],
      sections: [
        {
          heading: "Applying a tourniquet",
          items: [
            "2–3 inches above the wound when possible. If over a joint, place it above the joint.",
            "Wrap around the limb at least twice.",
            "Tie a half knot.",
            "Use a stick, trauma shears or sturdy instrument as a windlass.",
            "Place it over the half knot & secure with a full knot.",
            "Rotate to apply as much pressure as possible.",
            "Tie into place after bleeding has stopped.",
            "DO NOT REMOVE IT.",
            "If bleeding doesn't stop, tighten or apply another one side-by-side.",
            "WRITE THE TIME ON THE TOURNIQUET."
          ]
        }
      ]
    },
    {
      id: "skin",
      title: "Skin",
      keywords: ["skin", "pale", "color", "temperature", "moisture", "perfusion"],
      sections: [
        {
          heading: "Skin",
          items: [
            "Skin color, temperature & moisture reflect perfusion."
          ]
        }
      ]
    },
    {
      id: "clammy",
      title: "Clammy",
      keywords: ["clammy", "cool", "moist", "pale", "skin"],
      sections: [
        {
          heading: "Clammy",
          items: [
            "\"Clammy\" skin lacks pigmentation, is cool & very moist.",
            "Often a sign of poor perfusion or shock."
          ]
        }
      ]
    },
    {
      id: "heart-rate",
      title: "Heart Rate",
      keywords: ["heart rate", "pulse", "bpm", "beats"],
      sections: [
        {
          heading: "Heart Rate",
          items: [
            "Number of beats per minute (60–100 normal).",
            "Recheck over time to spot trends."
          ]
        }
      ]
    },
    {
      id: "respiratory-rate",
      title: "Respiratory Rate",
      keywords: ["respiratory rate", "breaths", "breathing", "rr"],
      sections: [
        {
          heading: "Respiratory Rate",
          items: [
            "Number of breaths per minute (12–20 normal).",
            "Recheck over time to spot trends."
          ]
        }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // CATEGORIES
  // ---------------------------------------------------------------------------
  categories: [
    "Circulation & Shock",
    "Neurological & Spinal",
    "Brain / Head",
    "Musculoskeletal",
    "Wounds & Soft Tissue",
    "Burns",
    "Abdominal Trauma",
    "Chest Trauma",
    "Heart / Cardiac",
    "Allergic",
    "Respiratory",
    "Diabetic / Metabolic",
    "Environmental - Cold",
    "Environmental - Heat",
    "Environmental - Altitude"
  ],

  // ---------------------------------------------------------------------------
  // INJURIES / TRAUMAS
  // ---------------------------------------------------------------------------
  injuries: [
    {
      id: "shock",
      name: "Shock",
      category: "Circulation & Shock",
      signs: [
        "Inadequate perfusion - signs depend on the underlying cause.",
        "May accompany bleeding, trauma, spinal injury (neurogenic), or sepsis (septic)."
      ],
      management: [
        "Treat the underlying cause.",
        "Control bleeding, maintain ABCs, insulate & keep the patient warm.",
        "Evacuate."
      ],
      notes: [
        "Shock is inadequate perfusion. It does not occur spontaneously - it is always secondary to its cause.",
        "Perfusion = oxygen & vital nutrients reaching the body's cells."
      ]
    },
    {
      id: "severe-bleeding",
      name: "Severe Bleeding / Hemorrhage",
      category: "Circulation & Shock",
      signs: [
        "Three types of bleeds: capillary, venous & arterial.",
        "Arterial bleeding is bright and spurting; venous is darker and steady."
      ],
      management: [
        "Direct pressure.",
        "Tourniquet: 2–3 inches above wound (above the joint if over a joint).",
        "Wrap around limb at least twice, tie a half knot, add a windlass (stick/shears), secure with a full knot, rotate for maximum pressure.",
        "Tie into place after bleeding stops. DO NOT REMOVE IT.",
        "If bleeding doesn't stop, tighten or apply another tourniquet side-by-side.",
        "WRITE THE TIME ON THE TOURNIQUET."
      ],
      notes: [
        "Bleeding → less blood → less oxygen delivered → shock."
      ]
    },
    {
      id: "spinal-injury",
      name: "Spinal Injury",
      category: "Neurological & Spinal",
      signs: [
        "Numbness or tingling in the hands or feet that are uninjured.",
        "Decreased ability to move or feel parts of the body.",
        "Loss of bladder and/or bowel control.",
        "Midline neck or back pain directly over the spine.",
        "Deformities of the spine.",
        "Difficulty maintaining body temperature - if severe enough can lead to neurogenic shock."
      ],
      management: [
        "If there is a Mechanism Of Injury (MOI) that may cause spinal injury, spinal motion restriction (SMR) may be needed.",
        "Use NEXUS to assess. The patient must meet ALL FIVE criteria to NOT need SMR:",
        "• No midline or C-spine pain or tenderness",
        "• Must be sober",
        "• Alert & Oriented (A&O x4 or x3)",
        "• No neurological deficits",
        "• No significant distracting injuries"
      ],
      notes: []
    },
    {
      id: "concussion",
      name: "Concussion / Brain Injury",
      category: "Brain / Head",
      signs: [
        "Concussion signs: headache, nausea, memory problems, confusion, balance issues, sensitivity to light or noise.",
        "Warning signs of a SEVERE structural brain injury: long loss of consciousness, seizures, repeated vomiting, worsening condition, use of blood thinner, signs of skull fracture, change in size or unequal pupils."
      ],
      management: [
        "1. Airway & Breathing.",
        "2. Circulation.",
        "3. Temperature - prevent from getting too hot or too cold.",
        "4. Packaging - don't use hard back boards or stiff neck collars.",
        "5. Positioning - keep head slightly raised but inline with body to reduce swelling.",
        "6. Monitor closely - pupils, breathing & level of response."
      ],
      notes: [
        "Concussion is a mild brain injury - it happens when the brain doesn't work normally after a trauma.",
        "Evaluation: (1) rule out severe structural brain injury, (2) check for concussion signs, (3) continue to monitor & assess."
      ]
    },
    {
      id: "musculoskeletal",
      name: "Musculoskeletal Injury",
      category: "Musculoskeletal",
      signs: [
        "Assessed with CMS = Circulation, Movement & Sensation.",
        "Circulation: pale, blue, purple or black skin, or swollen areas - bad! No pulse below the injury - bad!",
        "Movement & Sensation: cannot wriggle toes/fingers; cannot feel a pinch on top of fingers/toes (possible nerve damage); numbness or tingling at/below the injury (possible nerve or circulation damage)."
      ],
      management: [
        "Assess CMS before & after splinting and throughout care.",
        "Splint - Sling & Swathe: knot in the middle corner of a triangle bandage, place the knot behind the elbow to create a pocket for the arm, knot the two loose ends around neck & shoulder, apply a swathe around the chest to stabilize (not too tight).",
        "If CMS problems, evacuate!",
        "Ask the patient to report any later numbness, tingling or increase in pain."
      ],
      notes: [
        "Goals: assess circulation & nerve function, lower risk of infection & long-term disability, prevent further harm, monitor for circulation & nerve compromise."
      ]
    },
    {
      id: "wounds",
      name: "Wounds",
      category: "Wounds & Soft Tissue",
      signs: [
        "Bleeding and risk of infection.",
        "Watch for signs of infection developing over time."
      ],
      management: [
        "Control bleeding → 10–15 mins direct pressure.",
        "Assess & clean wound.",
        "Irrigate wound → ~1000 ml water.",
        "Wound closure if appropriate → skin glue or surgical tape.",
        "Protect wound → clean gauze.",
        "Monitor wound & patient.",
        "DO NOT close bite wounds, deep or large wounds, infected wounds, or wounds with high probability of infection.",
        "Replace dressing every 24 hours."
      ],
      notes: [
        "Goals: bleeding & hemorrhage control; reduce risk of infection & promote healing; reduce discomfort, pain, disability & loss of function."
      ]
    },
    {
      id: "sepsis",
      name: "Sepsis / Septic Shock",
      category: "Wounds & Soft Tissue",
      signs: [
        "Fever.",
        "Fast heart rate.",
        "Fast respiratory rate.",
        "Confusion."
      ],
      management: [
        "Treat the source infection, support ABCs.",
        "Evacuate - can progress to septic shock."
      ],
      notes: [
        "Sepsis: a serious condition where the body responds improperly to an infection; the infection-fighting process turns on the body, causing organs to work poorly.",
        "Septic shock: a dramatic drop in blood pressure that can damage the lungs, kidneys, liver and other organs. Severe damage can lead to death."
      ]
    },
    {
      id: "burns",
      name: "Burns",
      category: "Burns",
      signs: [
        "Superficial, partial thickness, or full thickness burns."
      ],
      management: [
        "Rinsing or submerging can help with pain & stop the burning process. DO NOT do this for more than 10 mins.",
        "Burn gels initially for minor, superficial or partial thickness burns - NOT for large partial or full thickness burns (can promote infection & cause skin damage).",
        "Dress the burn site with clean, dry gauze.",
        "Manage pain with OTC drugs."
      ],
      notes: []
    },
    {
      id: "abdominal-trauma",
      name: "Abdominal Trauma",
      category: "Abdominal Trauma",
      signs: [
        "Bruising around the belly button.",
        "Swelling.",
        "Rigidity.",
        "Muscle spasms.",
        "Pain.",
        "Blood in urine."
      ],
      management: [
        "Can't do much - cannot stop internal bleeding.",
        "Monitor ABC.",
        "Evacuate immediately."
      ],
      notes: [
        "Quadrants: RUQ - liver, gall bladder, part of pancreas. LUQ - stomach, spleen, rest of pancreas. RLQ - small & large intestines, appendix. LLQ - small & large intestines. Kidneys sit behind the other organs; urinary bladder below the quadrants."
      ]
    },
    {
      id: "impalement",
      name: "Impalement",
      category: "Wounds & Soft Tissue",
      signs: [
        "Object embedded in the body."
      ],
      management: [
        "DO NOT REMOVE the object.",
        "Dress with a donut dressing made from a triangle bandage."
      ],
      notes: []
    },
    {
      id: "evisceration",
      name: "Evisceration",
      category: "Abdominal Trauma",
      signs: [
        "Organs protruding from the abdomen."
      ],
      management: [
        "NEVER push abdominal organs back into the body.",
        "Keep the organs moist.",
        "Cover with an airtight, occlusive dressing - trash bags are ideal."
      ],
      notes: []
    },
    {
      id: "flail-chest",
      name: "Flail Chest",
      category: "Chest Trauma",
      signs: [
        "Shallow breathing.",
        "Lips or fingers turning blue."
      ],
      management: [
        "Apply bulky padding - a bunched-up t-shirt, rolls of gauze, etc.",
        "Lay the patient down on the side of injury.",
        "Evacuate."
      ],
      notes: [
        "Two or more ribs break in a way that completely detaches them from the rib cage. With each breath the detached pieces move opposite to the rest of the rib cage; the sharp ends tear up tissue, blood vessels and lungs.",
        "Causes breathing & circulation issues. Life threatening."
      ]
    },
    {
      id: "rib-fracture",
      name: "Rib Fracture",
      category: "Chest Trauma",
      signs: [
        "Pain, especially with breathing."
      ],
      management: [
        "Pain management and monitoring."
      ],
      notes: [
        "Isolated rib fractures are painful but generally benign."
      ]
    },
    {
      id: "pneumothorax",
      name: "Pneumothorax",
      category: "Chest Trauma",
      signs: [
        "Sudden chest pain.",
        "Shortness of breath."
      ],
      management: [
        "Seal any open wound with a gloved hand, then an occlusive dressing.",
        "Monitor ABCs and evacuate."
      ],
      notes: [
        "Air entering the space between the lung & chest wall; can cause the lung to collapse partially or fully.",
        "Causes: ice axe stabbing, fall onto chest, puncture from a rib."
      ]
    },
    {
      id: "tension-pneumothorax",
      name: "Tension Pneumothorax",
      category: "Chest Trauma",
      signs: [
        "Worsening shortness of breath, severe distress.",
        "Compromised ABCs."
      ],
      management: [
        "Rapid evacuation - this is life threatening."
      ],
      notes: [
        "A pneumothorax can progress to a tension pneumothorax. The collapsed lung pushes onto the heart, blood vessels & the other lung, compromising ABC."
      ]
    },
    {
      id: "hemothorax",
      name: "Hemothorax / Hemopneumothorax",
      category: "Chest Trauma",
      signs: [
        "\"Bubbling chest wound\".",
        "Shortness of breath and chest pain."
      ],
      management: [
        "Seal any opening with a gloved hand.",
        "Cover with an occlusive dressing taped on 4 sides.",
        "Occlusive dressing = doesn't allow air to pass (glove, plastic bag, wrapper)."
      ],
      notes: [
        "Hemothorax: same as pneumothorax but blood instead of air. Hemopneumothorax: a combination of the two."
      ]
    },
    {
      id: "lung-contusion",
      name: "Lung Contusion",
      category: "Chest Trauma",
      signs: [
        "Shortness of breath.",
        "Chest pain.",
        "Coughing."
      ],
      management: [
        "Monitor breathing and ABCs; evacuate."
      ],
      notes: [
        "A bruise on the lung caused by chest trauma leading to bleeding & fluid buildup that can interfere with breathing."
      ]
    },
    {
      id: "cardiac-tamponade",
      name: "Cardiac Tamponade",
      category: "Heart / Cardiac",
      signs: [
        "Signs of shock; the heart cannot fill properly."
      ],
      management: [
        "Rapid evacuation."
      ],
      notes: [
        "Excess fluid in the pericardial sac surrounding the heart leads to pressure that prevents the heart from filling with blood."
      ]
    },
    {
      id: "cardiac-contusion",
      name: "Cardiac Contusion",
      category: "Heart / Cardiac",
      signs: [
        "Chest pain.",
        "Shortness of breath.",
        "Pale color.",
        "Inability to exert oneself.",
        "Fast heartbeat (mild) to heart attack (severe)."
      ],
      management: [
        "Monitor ABCs, rest, evacuate."
      ],
      notes: [
        "A myocardial contusion is a bruise on the heart muscle caused by blunt trauma. Both mild and severe forms can lead to cardiac collapse & shock."
      ]
    },
    {
      id: "anaphylaxis",
      name: "Anaphylaxis",
      category: "Allergic",
      signs: [
        "Skin issues such as itchiness, rashes & hives.",
        "Swelling of the mouth, lips or tongue.",
        "Breathing issues such as a cough, wheezing & tight throat.",
        "Feeling faint & weak.",
        "Vomiting and diarrhea."
      ],
      management: [
        "Administration of Epinephrine - into muscle ASAP, especially if there is tightening/swelling of the airway, or signs of shock (feeling faint or lightheaded).",
        "Removal of the allergen, if possible.",
        "Monitor ABCs.",
        "Evacuate."
      ],
      notes: [
        "An allergic reaction involving multiple body systems. Anaphylactic reactions (anaphylaxis) are life threatening."
      ]
    },
    {
      id: "epiglottitis",
      name: "Epiglottitis",
      category: "Respiratory",
      signs: [
        "High fever.",
        "Very sore throat.",
        "Difficulty swallowing.",
        "Maybe drooling, in a tripod or sniffing position."
      ],
      management: [
        "Keep the patient calm.",
        "Allow no physical exertion.",
        "Evacuate."
      ],
      notes: []
    },
    {
      id: "pneumonia",
      name: "Pneumonia",
      category: "Respiratory",
      signs: [
        "Fever.",
        "Productive cough - brings up mucus or phlegm.",
        "Exertional dyspnea - shortness of breath.",
        "Chest discomfort.",
        "Hypoxia.",
        "Altered mental states.",
        "Pain that varies with breathing."
      ],
      management: [
        "Evacuate."
      ],
      notes: [
        "A general term for infection of the lung that interferes with breathing; often secondary to other infections & injury."
      ]
    },
    {
      id: "tuberculosis",
      name: "Tuberculosis",
      category: "Respiratory",
      signs: [
        "Fever.",
        "Coughing.",
        "Fatigue.",
        "Night sweats.",
        "Weight loss.",
        "Not wanting to eat."
      ],
      management: [
        "Contagious - use protection such as gloves, masks, and eyeglasses.",
        "Evacuate."
      ],
      notes: [
        "A lung infection."
      ]
    },
    {
      id: "asthma-copd",
      name: "Asthma / COPD",
      category: "Respiratory",
      signs: [
        "Wheezing & coughing.",
        "Chest tightness.",
        "Shortness of breath.",
        "The patient usually knows."
      ],
      management: [
        "Inhaler or other medications; you can assist with the inhaler.",
        "Make a plan beforehand: is it difficult to manage? Do they often return? Does it require intubation or hospitalization?",
        "These patients may need immediate evacuation at the first signs."
      ],
      notes: [
        "Asthma: sudden spasming of the bronchioles with swelling & mucus production; restricts the diameter of the airway, making it harder to breathe. Triggers: allergens, exertion, stress, cold or hot temperatures.",
        "COPD (Chronic Obstructive Pulmonary Disorders): a group of ongoing illnesses affecting the respiratory system - asthma, chronic bronchitis, emphysema."
      ]
    },
    {
      id: "pulmonary-edema",
      name: "Pulmonary Edema",
      category: "Respiratory",
      signs: [
        "Coughing.",
        "Pink frothy sputum.",
        "Anxiety.",
        "Hypoxia.",
        "Dyspnea.",
        "Wet lung sounds."
      ],
      management: [
        "Evacuate."
      ],
      notes: [
        "Acute pulmonary edema is a collection of fluid in the lungs caused by inadequate pumping of the left side of the heart. Causes: injury to the heart, congestive heart failure."
      ]
    },
    {
      id: "pulmonary-embolism",
      name: "Pulmonary Embolism",
      category: "Respiratory",
      signs: [
        "Chest pain.",
        "Dyspnea.",
        "Bloody cough.",
        "Cyanosis (bluish-purple skin).",
        "Hypoxia."
      ],
      management: [
        "Evacuate."
      ],
      notes: [
        "A blood clot within the pulmonary arteries in the lungs that completely or incompletely blocks blood flow."
      ]
    },
    {
      id: "myocardial-infarction",
      name: "Myocardial Infarction (Heart Attack)",
      category: "Heart / Cardiac",
      signs: [
        "Chest pain (hallmark symptom).",
        "Weakness.",
        "Nausea.",
        "Dizziness.",
        "Pale/grey or cool clammy skin.",
        "Cyanosis.",
        "Discomfort or crushing sensation.",
        "Pain in lower jaw, arm, neck, between shoulder blades or abdomen.",
        "Shortness of breath.",
        "Anxiety or a feeling of impending doom.",
        "Altered mentation.",
        "Sudden collapse."
      ],
      management: [
        "Apply oxygen if available.",
        "Administer 324 mg aspirin.",
        "If the patient has nitroglycerin, assist if their blood pressure is not low.",
        "Monitor ABCs.",
        "Evacuate."
      ],
      notes: [
        "Obstructed blood flow to cardiac tissue causes cardiac cell death. Dead tissue cannot be revived and will damage the heart's ability to pump. Time is tissue.",
        "Anyone above 50 has a much higher chance of experiencing an MI despite an active lifestyle."
      ]
    },
    {
      id: "hypoglycemia",
      name: "Hypoglycemia",
      category: "Diabetic / Metabolic",
      signs: [
        "Altered mentation or behavioral changes - including appearing drunk or becoming aggressive.",
        "Dizziness.",
        "Headache.",
        "Clammy skin.",
        "Seizures.",
        "Low BP.",
        "Eventually unconsciousness."
      ],
      management: [
        "Administer sugar. If in doubt, administer sugar.",
        "If the patient is alert, give oral glucose or sugary foods - soda, juice, sugar packets (no artificial sweeteners).",
        "Once the patient responds positively, consider more complex sugars - sandwiches, food bars, pasta.",
        "If unconscious or unable to swallow, rub small amounts against the inside of the cheek.",
        "Support ABCs. Never give insulin."
      ],
      notes: [
        "Can happen very quickly and is an immediate life threat. The brain needs glucose and will suffer permanent damage or death if not corrected.",
        "A patient may go from completely alert & oriented to unconscious in a few seconds; death will quickly follow.",
        "Normal blood glucose level: 80–120 mg/dl."
      ]
    },
    {
      id: "hyperglycemia",
      name: "Hyperglycemia",
      category: "Diabetic / Metabolic",
      signs: [
        "Increased urination.",
        "Increased thirst & hunger.",
        "Altered mentation.",
        "DKA: deep rapid breaths, altered mentation, blood glucose above 400 mg/dl.",
        "HHNS: dehydration, seizures and coma."
      ],
      management: [
        "Support ABCs and reassess the patient.",
        "If in doubt, administer sugar.",
        "Never give insulin.",
        "Evacuate."
      ],
      notes: [
        "Slower onset over a period of days - too much sugar in the blood but not in the cells, which are being starved.",
        "High blood glucose can lead to Diabetic Ketoacidosis (DKA) or Hyperosmolar Hyperglycemic Nonketotic Syndrome (HHNS)."
      ]
    },
    {
      id: "headaches",
      name: "Headaches",
      category: "Neurological & Spinal",
      signs: [
        "Tension headaches: squeezing, dull or aching pain from tense neck, shoulder and scalp muscles.",
        "Sinus headaches: pressure from fluid collected in the sinuses; often paired with cold-like symptoms (congestion, cough, chills, fever); worse with head movement.",
        "Migraines: pounding, throbbing, stabbing or pulsating pain; associated with nausea, vomiting & vision or speech problems. Women 3x more likely than men."
      ],
      management: [
        "Rest, hydration, OTC medications like Ibuprofen or Tylenol.",
        "Neck & head massage for tension headaches.",
        "Nasal decongestants for sinus headaches.",
        "Migraines are tricky: Excedrin or equivalent is best; if none, a dose of Aspirin, Tylenol & a strong cup of coffee."
      ],
      notes: [
        "Migraines are thought to be caused by changes in blood vessel size in the brain."
      ]
    },
    {
      id: "stroke",
      name: "Stroke",
      category: "Neurological & Spinal",
      signs: [
        "Altered mentation.",
        "Aphasia (inability to use or understand words).",
        "Facial drooping.",
        "Weakness or numbness in legs, arms or face on one side.",
        "Vision loss in one eye.",
        "Slurred speech.",
        "Dizziness.",
        "Headache.",
        "Coma."
      ],
      management: [
        "Assess with FAST - F: Facial droop (ask to smile). A: Arm drift (eyes closed, hold both arms up & out, watch for drift). S: Speech (repeat a simple sentence, listen for slurring). T: Time (when was the patient last seen acting normal? Time is tissue).",
        "Be ready to maintain the airway with ventilation as the patient deteriorates.",
        "Apply oxygen if available.",
        "Evacuate."
      ],
      notes: [
        "A stroke (cerebral vascular accident) interrupts cerebral circulation and leads to brain cell death.",
        "Ischemic strokes: a blood clot blocks blood flow. Hemorrhagic strokes: a ruptured cerebral artery bleeds into the brain and compresses tissue as pressure rises."
      ]
    },
    {
      id: "seizures",
      name: "Seizures",
      category: "Neurological & Spinal",
      signs: [
        "Partial seizures: altered mentation but no loss of consciousness; isolated muscle twitching, lip smacking & abnormal facial movements.",
        "Generalized seizures: loss of consciousness & chaotic muscle contractions, lasting 2 to 5 minutes.",
        "Postictal state after a generalized seizure: patient slowly regains consciousness, lasting 5–30 mins."
      ],
      management: [
        "Lay them on their side (don't restrain).",
        "Protect them from hitting anything.",
        "Loosen clothing around the neck.",
        "Be ready to suction the airway for secretions or vomit.",
        "Evacuate."
      ],
      notes: [
        "A neurological episode caused by a surge of electrical misfiring within the brain. Causes: epilepsy, drug abuse, head trauma, hypoglycemia, stroke, poisoning, high fever & more."
      ]
    },
    {
      id: "hypothermia",
      name: "Hypothermia",
      category: "Environmental - Cold",
      signs: [
        "Drop in core body temperature below the normal 98.6°F (37°C).",
        "Combined with shock/trauma, it worsens shock and significantly reduces survival chances."
      ],
      management: [
        "5-point hypowrap: (1) dry base layers, (2) internal vapor barrier - trash bag/reflective blanket, (3) insulating layer - winter-rating sleeping bag, (4) ground insulation, (5) weather barrier fully wrapped around patient - tarp, tent fly, bivy bag.",
        "Calorie loading - warm sugary fluids & high-calorie foods.",
        "Active rewarming - place warm (or hot) packs/bottles near the neck, armpits & groin."
      ],
      notes: [
        "Hypothermia can be fatal on its own."
      ]
    },
    {
      id: "hyponatremia",
      name: "Hyponatremia",
      category: "Environmental - Cold",
      signs: [
        "Fatigue/weakness.",
        "Increased thirst.",
        "Nausea/vomiting.",
        "Dizziness/headache.",
        "Confusion/disorientation.",
        "Blurred vision.",
        "Breathing difficulty.",
        "Seizure.",
        "Decreased responsiveness/coma.",
        "Decreased urination."
      ],
      management: [
        "Determine water consumption.",
        "Restrict further water consumption."
      ],
      notes: [
        "A decrease in sodium levels within the body. Causes: over-hydration (more than 1500 ml water per hour over multiple hours); decreased urination (body cannot get rid of excess water)."
      ]
    },
    {
      id: "immersion-foot",
      name: "Immersion Foot (Trench Foot)",
      category: "Environmental - Cold",
      signs: [
        "Foot appears wrinkled, pale in color.",
        "Sometimes skin detaches from the deeper layers of the foot."
      ],
      management: [
        "Remove wet boots & socks.",
        "Dry gently.",
        "Gradually rewarm.",
        "DO NOT rub the skin."
      ],
      notes: [
        "The result of prolonged exposure to cold moisture."
      ]
    },
    {
      id: "frost-nip",
      name: "Frost Nip",
      category: "Environmental - Cold",
      signs: [
        "Superficial, non-freezing injury of exposed skin."
      ],
      management: [
        "Remove from the cold environment.",
        "Rewarm gently."
      ],
      notes: [
        "No long-term damage expected."
      ]
    },
    {
      id: "frost-bite",
      name: "Frost Bite",
      category: "Environmental - Cold",
      signs: [
        "Pale skin with few blisters.",
        "After thawing, turns red or purple; more blisters may appear.",
        "Black areas are signs of tissue death.",
        "Superficial: little or no tissue loss expected. Deep: tissue loss & amputation."
      ],
      management: [
        "Prevention is better than treatment. Prevention = Perfusion + Protection.",
        "DO NOT thaw if the likelihood of refreezing is high; wrap the injury in bulky gauze.",
        "Active (rapid rewarming) - only if resources are available & hospital is 72 hrs away: submerge in heated water (37–39°C, up to 30 mins), maintain water temp, air dry (do not rub with a towel), wrap in clean loose gauze, splint if needed.",
        "Passive - thaw on its own: DO NOT rupture blisters, administer Ibuprofen (12 mg/kg), apply aloe vera, elevate the injury."
      ],
      notes: [
        "Freezing of the skin & underlying tissue.",
        "Perfusion: blood circulation to hands & feet, proper hydration & nutrition, maintain core body temp, avoid restrictive clothing/tight boots & caffeine, alcohol, nicotine.",
        "Protection: insulation, socks, gloves; minimize exposure."
      ]
    },
    {
      id: "ams",
      name: "Acute Mountain Sickness (AMS)",
      category: "Environmental - Altitude",
      signs: [
        "Headache.",
        "Fatigue.",
        "Dizziness.",
        "Nausea.",
        "Vomiting."
      ],
      management: [
        "Rest.",
        "Hydration.",
        "Comfort care (Ibuprofen, Tylenol)."
      ],
      notes: [
        "Swelling of the brain.",
        "Acclimatization: above 10,000 ft (3000 m), do not sleep at an altitude higher than 2000 ft per day. Climb high, sleep low."
      ]
    },
    {
      id: "hape",
      name: "High Altitude Pulmonary Edema (HAPE)",
      category: "Environmental - Altitude",
      signs: [
        "Wet cough.",
        "Bloody sputum.",
        "Cyanosis.",
        "Difficulty breathing.",
        "Altered mentation.",
        "Severe hypoxia.",
        "Wet lung sounds."
      ],
      management: [
        "Descend at least 1000 m.",
        "Hyperbaric chamber.",
        "Medications - Diamox, dexamethasone & nifedipine."
      ],
      notes: [
        "Occurs above ~12,000 ft. Fluid buildup in the lungs, decreasing the ability to respire."
      ]
    },
    {
      id: "hace",
      name: "High Altitude Cerebral Edema (HACE)",
      category: "Environmental - Altitude",
      signs: [
        "Altered mentation.",
        "Ataxia (poor muscle control - clumsy movement, balance problems).",
        "Abnormal pupils.",
        "Seizures.",
        "Behavioral changes (combativeness, suspicion of others, hallucinations, unable to reason, mood swings)."
      ],
      management: [
        "Descend at least 1000 m.",
        "Hyperbaric chamber.",
        "Medications - Diamox, dexamethasone & nifedipine."
      ],
      notes: [
        "Fluid buildup in the brain increases intracranial pressure."
      ]
    },
    {
      id: "heat-cramps",
      name: "Heat Cramps",
      category: "Environmental - Heat",
      signs: [
        "Painful muscle spasms during or after intense activity, usually in the legs or abdominal muscles."
      ],
      management: [
        "Rest, cool down, hydrate & replace electrolytes."
      ],
      notes: [
        "A warning sign that the body is getting hot."
      ]
    },
    {
      id: "heat-syncope",
      name: "Heat Syncope",
      category: "Environmental - Heat",
      signs: [
        "Momentary loss of consciousness because of heat exposure."
      ],
      management: [
        "Lay the patient down, cool them, hydrate."
      ],
      notes: [
        "A warning sign that the body is getting hot."
      ]
    },
    {
      id: "heat-exhaustion",
      name: "Heat Exhaustion",
      category: "Environmental - Heat",
      signs: [
        "Dizziness.",
        "Headache.",
        "Nausea.",
        "Vomiting.",
        "Clammy skin.",
        "Fast HR.",
        "Low BP.",
        "Body temp 98–104°F."
      ],
      management: [
        "Move to a cool area, rest, hydrate & replace electrolytes.",
        "Cool the patient; monitor for progression to heat stroke."
      ],
      notes: [
        "Hypovolemia from excessive sweating & electrolyte loss - loss of fluids like blood & water. This is an emergency."
      ]
    },
    {
      id: "heat-stroke",
      name: "Heat Stroke",
      category: "Environmental - Heat",
      signs: [
        "Body temp above 40°C.",
        "May sweat, but NO sweat is a strong indication.",
        "Altered mentation.",
        "Unresponsiveness.",
        "Seizures.",
        "Slow HR.",
        "Low BP & RR."
      ],
      management: [
        "Aggressive cooling - reducing the duration of high temperature is paramount.",
        "Cold water submersion (CWS).",
        "If CWS is not possible, douse in water & cover in wet clothing & fan.",
        "Evacuate."
      ],
      notes: [
        "An emergency."
      ]
    }
  ]
};
