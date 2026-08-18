import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT

def create_resume_pdf(output_path="assets/ATHARV-PAWAR-Resume.pdf"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Letter size is 8.5 x 11 inches (612 x 792 points)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=28,
    )
    
    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#0f172a") # Slate 900
    accent_blue = colors.HexColor("#1d4ed8")   # Blue 700
    text_dark = colors.HexColor("#1e293b")     # Slate 800
    text_muted = colors.HexColor("#475569")    # Slate 600
    border_color = colors.HexColor("#cbd5e1")  # Slate 300
    
    # Custom Typography Styles
    title_style = ParagraphStyle(
        'NameTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=21,
        alignment=TA_CENTER,
        textColor=primary_color,
        textTransform='uppercase',
    )
    
    subtitle_style = ParagraphStyle(
        'Headline',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13.5,
        alignment=TA_CENTER,
        textColor=accent_blue,
        spaceAfter=2,
    )
    
    contact_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=11.5,
        alignment=TA_CENTER,
        textColor=text_muted,
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.8,
        leading=12.5,
        textColor=primary_color,
        spaceBefore=5,
        spaceAfter=3,
        textTransform='uppercase',
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=11.8,
        textColor=text_dark,
        alignment=TA_JUSTIFY,
    )
    
    skill_label_style = ParagraphStyle(
        'SkillLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.4,
        leading=11.2,
        textColor=primary_color,
    )
    
    skill_val_style = ParagraphStyle(
        'SkillValue',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.4,
        leading=11.2,
        textColor=text_dark,
    )
    
    entry_title_style = ParagraphStyle(
        'EntryTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=11.5,
        textColor=primary_color,
    )
    
    entry_sub_style = ParagraphStyle(
        'EntrySubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.6,
        leading=11,
        textColor=accent_blue,
    )
    
    entry_meta_style = ParagraphStyle(
        'EntryMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.1,
        leading=10.5,
        textColor=text_muted,
    )
    
    date_style = ParagraphStyle(
        'EntryDate',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=11.5,
        alignment=TA_RIGHT,
        textColor=text_muted,
    )
    
    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.4,
        leading=11.5,
        textColor=text_dark,
        leftIndent=11,
        firstLineIndent=-7,
        spaceAfter=2,
    )

    story = []
    
    # ================= PAGE 1 =================
    story.append(Paragraph("<b>ATHARV PAWAR</b>", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>SOFTWARE &amp; AI ENGINEER</b>", subtitle_style))
    
    contact_line_1 = (
        'Email: <a href="mailto:pawaratharv06@gmail.com" color="#1d4ed8"><b>pawaratharv06@gmail.com</b></a> &nbsp;|&nbsp; '
        'Phone: <b>+91 8010562215</b> &nbsp;|&nbsp; '
        'Location: <b>India (Open to Remote / Relocation)</b>'
    )
    contact_line_2 = (
        'Portfolio: <a href="https://atharvpawar.work.gd" color="#1d4ed8"><b>atharvpawar.work.gd</b></a> &nbsp;|&nbsp; '
        'GitHub: <a href="https://github.com/Atharv06pawar" color="#1d4ed8"><b>github.com/Atharv06pawar</b></a> &nbsp;|&nbsp; '
        'LinkedIn: <a href="https://www.linkedin.com/in/-atharvpawar" color="#1d4ed8"><b>linkedin.com/in/-atharvpawar</b></a>'
    )
    story.append(Paragraph(contact_line_1, contact_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph(contact_line_2, contact_style))
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=2, spaceAfter=4))
    
    # --- PROFESSIONAL SUMMARY ---
    story.append(Paragraph("<b>PROFESSIONAL SUMMARY</b>", section_heading))
    summary_text = (
        "End-to-End <b>Software &amp; AI Engineer</b> and technical generalist with hands-on experience taking complex "
        "problems from concept and system architecture to backend implementation, AI/ML integration, testing, and deployment. "
        "Proven expertise across LLM systems, grounded scientific RAG pipelines, custom PyTorch ML models, modular REST APIs, "
        "real-time WebSocket audio streaming, and responsive web platforms. Founder of REDAESTH with demonstrated ownership in "
        "solving ambiguous technical problems and delivering reliable, production-ready software."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=3, spaceAfter=3))
    
    # --- TECHNICAL SKILLS ---
    story.append(Paragraph("<b>TECHNICAL SKILLS &amp; DOMAIN EXPERTISE</b>", section_heading))
    
    skills_data = [
        [
            Paragraph("<b>Languages:</b>", skill_label_style),
            Paragraph("Python, JavaScript (ES6+), TypeScript, C++ (C++17), Java, HTML5, CSS3, SQL", skill_val_style)
        ],
        [
            Paragraph("<b>AI &amp; Machine Learning:</b>", skill_label_style),
            Paragraph("LLM Systems, RAG Pipelines, FAISS (C++ Vector DB), Dense Embeddings (SentenceTransformers), PyTorch (Custom Transformers, RoPE, SwiGLU, RMSNorm, KV Cache), Dataset Engineering, Multi-Agent Systems, AI Red Teaming", skill_val_style)
        ],
        [
            Paragraph("<b>Backend &amp; APIs:</b>", skill_label_style),
            Paragraph("Node.js, Express, RESTful APIs, JWT Authentication, Microservices Architecture, Serverless (Vercel), Middleware", skill_val_style)
        ],
        [
            Paragraph("<b>Real-Time &amp; Voice:</b>", skill_label_style),
            Paragraph("WebSockets, Bidirectional Audio Streaming, Voice Activity Detection (VAD), STT/TTS Integration", skill_val_style)
        ],
        [
            Paragraph("<b>Frontend &amp; UI:</b>", skill_label_style),
            Paragraph("React, Next.js, Tailwind CSS, Responsive Layout Architecture, State Management, DOM APIs, Canvas", skill_val_style)
        ],
        [
            Paragraph("<b>Data &amp; Storage:</b>", skill_label_style),
            Paragraph("PostgreSQL, MongoDB, SQLite (Android Room Database), Vector Stores (FAISS), Persistent JSON Context Stores", skill_val_style)
        ],
        [
            Paragraph("<b>DevOps &amp; Security:</b>", skill_label_style),
            Paragraph("Git/GitHub, Docker Containerization, Linux Bash Scripting, CI/CD Workflows, Vercel, API Security, Prompt Injection Defense", skill_val_style)
        ],
    ]
    
    skills_table = Table(skills_data, colWidths=[1.55*inch, 5.85*inch])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=3, spaceAfter=3))
    
    # --- PROFESSIONAL & FOUNDER EXPERIENCE ---
    story.append(Paragraph("<b>PROFESSIONAL &amp; FOUNDER EXPERIENCE</b>", section_heading))
    
    exp_header = [
        [
            Paragraph("<b>Founder &amp; Lead Systems Engineer</b> &nbsp;<font color='#1d4ed8'>| REDAESTH Pvt. Ltd.</font>", entry_title_style),
            Paragraph("2024 – Present", date_style)
        ]
    ]
    t_exp = Table(exp_header, colWidths=[5.6*inch, 1.8*inch])
    t_exp.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BASELINE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_exp)
    story.append(Paragraph("<i>End-to-End Platform Architecture, Modular Backend Services &amp; Local AI Integration (Production Monorepo)</i>", entry_meta_style))
    
    exp_bullets = [
        "<b>Architected Full-Stack Monorepo:</b> Engineered scalable platform combining a responsive React client, modular Node.js/Express REST API (<code>/api/v1</code>), and a standalone C++ companion coaching engine.",
        "<b>Engineered Local AI Companion Engine:</b> Implemented persistent context memory (<code>memory.json</code>) tracking user health goals, workout consistency, and nutrition, achieving zero-cloud-cost personalized interaction.",
        "<b>API &amp; Community Architecture:</b> Designed JWT authentication, user profile services, and interactive community post/comment endpoints with Vercel serverless integration and robust production error handling.",
        "<b>Full Technical Ownership:</b> Drove system design from database schemas and API contracts to UI implementation, performance profiling, and continuous deployment."
    ]
    for b in exp_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        
    story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=3, spaceAfter=3))
    
    # --- FEATURED AI & SYSTEMS CASE STUDY (Page 1) ---
    story.append(Paragraph("<b>FEATURED AI SECURITY &amp; MULTI-AGENT CASE STUDY</b>", section_heading))
    
    # Project 1: AegisSwarm
    p1_header = [
        [
            Paragraph("<b>AegisSwarm — Autonomous AI Red-Teaming &amp; Security Framework</b>", entry_title_style),
            Paragraph("2025 – 2026", date_style)
        ]
    ]
    t_p1 = Table(p1_header, colWidths=[5.6*inch, 1.8*inch])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BASELINE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p1)
    story.append(Paragraph("<i>Python, Multi-Agent Orchestration, Event-Driven Architecture, LLM Security (Research &amp; Prototype)</i>", entry_meta_style))
    p1_bullets = [
        "<b>Autonomous Multi-Agent Red-Teaming:</b> Architected an event-driven framework to systematically simulate and evaluate adversarial security attacks against LLM agents and multi-agent systems.",
        "<b>Advanced Planning &amp; Attack Chains:</b> Integrated Hierarchical Task Networks (HTN) and Tree-of-Thoughts (ToT) reasoning loops for coordinated multi-step attack chain exploration and evaluation.",
        "<b>Threat Model Simulation:</b> Implemented attack modules probing indirect prompt injection via tools, long-term memory poisoning, RAG corruption, and unauthorized tool invocations.",
        "<b>Security Benchmarking:</b> Evaluated agent defenses against standardized security benchmark suites (ASB, AgentDojo, HarmBench) to generate structured automated vulnerability reports."
    ]
    for b in p1_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))

    # ================= PAGE 2 =================
    story.append(PageBreak())
    
    # Page 2 Header mini-banner
    p2_mini_header = [
        [
            Paragraph("<b>ATHARV PAWAR</b> &nbsp;|&nbsp; Software &amp; AI Engineer", ParagraphStyle('P2Title', fontName='Helvetica-Bold', fontSize=9, textColor=primary_color)),
            Paragraph("pawaratharv06@gmail.com &nbsp;|&nbsp; atharvpawar.work.gd", ParagraphStyle('P2Contact', fontName='Helvetica', fontSize=8.3, alignment=TA_RIGHT, textColor=text_muted))
        ]
    ]
    t_p2_mini = Table(p2_mini_header, colWidths=[4.0*inch, 3.4*inch])
    t_p2_mini.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_p2_mini)
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=1, spaceAfter=4))

    # --- SELECTED TECHNICAL & AI ENGINEERING PROJECTS (Page 2) ---
    story.append(Paragraph("<b>SELECTED AI, SYSTEMS &amp; SOFTWARE PROJECTS</b>", section_heading))
    
    # Project 2: GrindHaus AI
    p2_header = [
        [
            Paragraph("<b>GrindHaus AI — Scientific RAG Pipeline &amp; Custom PyTorch Transformer</b>", entry_title_style),
            Paragraph("2025 – 2026", date_style)
        ]
    ]
    t_p2 = Table(p2_header, colWidths=[5.6*inch, 1.8*inch])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BASELINE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p2)
    story.append(Paragraph("<i>Python, PyTorch, FAISS (C++ Vector DB), SentenceTransformers, REST API (Implemented &amp; Validated)</i>", entry_meta_style))
    p2_bullets = [
        "<b>Scientific RAG Ingestion Pipeline:</b> Engineered document extraction for sports science research papers: sliding-window chunking, <code>all-MiniLM-L6-v2</code> dense embeddings, and native C++ FAISS vector indexing for grounded retrieval.",
        "<b>Custom Transformer Architecture:</b> Implemented a 20-layer PyTorch GPT-style model (hidden_size=1536, 12 heads, max_seq_len=2048) featuring RoPE positional embeddings, SwiGLU activations, RMSNorm, KV-cache inference, and bf16 training scripts.",
        "<b>Curated Dataset &amp; Dynamic Router:</b> Generated and deduplicated an 800-sample domain instruction dataset with an intent-based router dynamically switching between Expert (scientific) and Companion (conversational) modes."
    ]
    for b in p2_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 3))

    # Project 3: Real-Time Voice AI Pipeline
    p3_header = [
        [
            Paragraph("<b>Real-Time Voice AI Streaming Pipeline</b>", entry_title_style),
            Paragraph("2025", date_style)
        ]
    ]
    t_p3 = Table(p3_header, colWidths=[5.6*inch, 1.8*inch])
    t_p3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BASELINE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p3)
    story.append(Paragraph("<i>Node.js, WebSockets, Bidirectional Audio Streaming, VAD, STT, TTS (Implemented &amp; Tested)</i>", entry_meta_style))
    p3_bullets = [
        "<b>Low-Latency Streaming Pipeline:</b> Engineered bidirectional streaming connecting browser audio to backend using WebSockets with ~20ms audio chunking for low-latency transmission.",
        "<b>Modular AI Processing Stages:</b> Integrated energy-based Voice Activity Detection (VAD), Speech-to-Text (STT), streaming LLM reasoning, and Text-to-Speech (TTS) with parallelized execution stages for fast response generation."
    ]
    for b in p3_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 3))

    # Project 4: PHFIXT / Client Platform
    p4_header = [
        [
            Paragraph("<b>PHFIXT / Client Platform (Therapist Website)</b>", entry_title_style),
            Paragraph("2025", date_style)
        ]
    ]
    t_p4 = Table(p4_header, colWidths=[5.6*inch, 1.8*inch])
    t_p4.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BASELINE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p4)
    story.append(Paragraph("<i>Next.js, Tailwind CSS, Vercel Cloud, Responsive Architecture (Production Deployed)</i>", entry_meta_style))
    p4_bullets = [
        "<b>Production Web Application:</b> Engineered a full-stack responsive web platform with modular components, custom typography scale, sub-second load times, and cloud deployment on Vercel.",
        "<b>Accessible Layout &amp; Performance:</b> Implemented mobile-first layout systems, micro-interactions, and optimized assets achieving high Lighthouse performance scores."
    ]
    for b in p4_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 3))

    # Project 5: ExpenJar
    p5_header = [
        [
            Paragraph("<b>ExpenJar — Offline-First Android Expense Management App</b>", entry_title_style),
            Paragraph("2024", date_style)
        ]
    ]
    t_p5 = Table(p5_header, colWidths=[5.6*inch, 1.8*inch])
    t_p5.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BASELINE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p5)
    story.append(Paragraph("<i>Java, Android SDK, SQLite Room Database, MVVM Architecture (Implemented)</i>", entry_meta_style))
    p5_bullets = [
        "<b>Native Mobile Architecture:</b> Built an offline-first financial tracker using SQLite via Room Database for persistent transactional storage and category-wise spending analytics.",
        "<b>State &amp; Data Integrity:</b> Designed reactive UI components with transaction rollback handling and structured monthly financial breakdown visualizations."
    ]
    for b in p5_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))

    story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=4, spaceAfter=3))

    # --- ENGINEERING METHODOLOGIES & WORKFLOW ---
    story.append(Paragraph("<b>ENGINEERING METHODOLOGY &amp; TECHNICAL EXECUTION</b>", section_heading))
    methodology_text = (
        "<b>End-to-End Execution:</b> 01 Understand requirements &amp; constraints &rarr; 02 Architect data flow &amp; interfaces &rarr; "
        "03 Build core functionality &rarr; 04 Integrate APIs, DBs &amp; AI services &rarr; 05 Validate, benchmark &amp; test &rarr; "
        "06 Package &amp; Deploy &rarr; 07 Monitor &amp; Iterate. Focused on pragmatic architectural decision-making, minimal technical debt, "
        "and rapid problem-solving across any layer of the software stack."
    )
    story.append(Paragraph(methodology_text, body_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=4, spaceAfter=3))

    # --- EDUCATION ---
    story.append(Paragraph("<b>EDUCATION</b>", section_heading))
    edu_header = [
        [
            Paragraph("<b>Government College of Engineering, Chandrapur</b>", entry_title_style),
            Paragraph("Expected 2026", date_style)
        ]
    ]
    t_edu = Table(edu_header, colWidths=[5.6*inch, 1.8*inch])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BASELINE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu)
    story.append(Paragraph("<i>Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering</i>", entry_sub_style))
    story.append(Paragraph("<b>Relevant Coursework:</b> Data Structures &amp; Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, Object-Oriented Programming", bullet_style))
    
    # Build document
    doc.build(story)
    print(f"Successfully generated PDF resume at: {output_path}")

if __name__ == "__main__":
    create_resume_pdf("assets/ATHARV-PAWAR-Resume.pdf")
