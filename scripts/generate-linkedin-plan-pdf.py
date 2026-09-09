# -*- coding: utf-8 -*-
"""Generate LinkedIn certificate posting plan PDF (Arabic)."""
from fpdf import FPDF
from pathlib import Path

OUT = Path(r"C:\Users\hash0\Desktop\LinkedIn_خطة_نشر_الشهادات.pdf")
FONT = Path(r"C:\Windows\Fonts\arial.ttf")

POSTS = [
    {
        "num": 1,
        "offset": "اليوم 1 (بداية الخطة)",
        "certs": ["DevOps & Git/GitHub Workshop"],
        "files": ["SmartMethods_DevOps_Git_Workshop_2026-06-30.pdf"],
        "caption_ar": """بداية رحلة Smart Methods (الأساليب الذكية) 🚀

حصلت على شهادة ورشة DevOps & Git/GitHub — أساس رفع المشاريع، GitHub، وCI/CD.

خطوة أولى قبل Robotics و IoT.

#DevOps #Git #GitHub #SmartMethods #ComputerScience #Makkah""",
    },
    {
        "num": 2,
        "offset": "+4 أيام",
        "certs": [
            "Fundamentals of Electric Circuits",
            "Mechanical Fundamentals",
        ],
        "files": [
            "SmartMethods_Fundamentals_of_Electric_Circuits_2026-07-05.pdf",
            "SmartMethods_Mechanical_Fundamentals_2026-07-05.pdf",
        ],
        "caption_ar": """أساسيات الهندسة — كهرباء + ميكانيك ⚡🔧

شهادتان مع Smart Methods:
• Fundamentals of Electric Circuits
• Mechanical Fundamentals

الأساس قبل الروبوتات والـ IoT.

#Electronics #MechanicalEngineering #Robotics #SmartMethods #Engineering""",
    },
    {
        "num": 3,
        "offset": "+4 أيام",
        "certs": ["Engineering Skills"],
        "files": ["SmartMethods_Engineering_Skills_2026-07-15.pdf"],
        "caption_ar": """Engineering Skills ✅

شهادة مهارات هندسية من Smart Methods — حل المشاكل، التوثيق، والعمل على مشاريع حقيقية.

#Engineering #SmartMethods #ProblemSolving #STEM""",
    },
    {
        "num": 4,
        "offset": "+4 أيام",
        "certs": ["Linux Fundamentals & ROS 2"],
        "files": ["SmartMethods_Linux_Fundamentals_2026-07-27.pdf"],
        "caption_ar": """Linux & ROS 2 🐧🤖

أكملت دورة Linux Fundamentals و ROS 2 مع Smart Methods — جاهز لبرمجة الروبوتات على Linux.

#Linux #ROS2 #Robotics #SmartMethods #IoT""",
    },
    {
        "num": 5,
        "offset": "+4 أيام",
        "certs": ["3D Printing"],
        "files": ["SmartMethods_3D_Printing_2026-08-02.pdf"],
        "caption_ar": """3D Printing 🖨️

شهادة الطباعة ثلاثية الأبعاد — من التصميم إلى قطعة جاهزة للتجميع (RoboDog & Kiba).

#3DPrinting #CAD #MechanicalDesign #SmartMethods #Maker""",
    },
    {
        "num": 6,
        "offset": "+4 أيام",
        "certs": ["Mechanical Design Program"],
        "files": ["SmartMethods_Mechanical_Design_Internship_2026.pdf"],
        "caption_ar": """Mechanical Design 📐

برنامج التصميم الميكانيكي مع Smart Methods — Onshape، kinematics، وتصميم هيكل RoboDog.

#MechanicalDesign #Onshape #Robotics #SmartMethods #Engineering""",
    },
    {
        "num": 7,
        "offset": "+4 أيام",
        "certs": ["Electronics, Power & IoT"],
        "files": ["SmartMethods_Electronics_Power_IoT_Internship_2026.pdf"],
        "caption_ar": """Electronics, Power & IoT ⚡📡

برنامج الإلكترونيات والطاقة و IoT — ESP32، MQTT، sensors، و remote control (RoboDog BodyV2).

#ESP32 #IoT #MQTT #Electronics #SmartMethods #EmbeddedSystems""",
    },
    {
        "num": 8,
        "offset": "+4 أيام",
        "certs": ["Robotics & AI Program"],
        "files": ["SmartMethods_Robotics_AI_Internship_2026.pdf"],
        "caption_ar": """Robotics & AI 🤖🧠

برنامج Robotics & AI مع Smart Methods — computer vision، ML، وربطها بالأنظمة المدمجة.

#Robotics #AI #MachineLearning #ComputerVision #SmartMethods""",
    },
    {
        "num": 9,
        "offset": "+4 أيام",
        "certs": ["Web Development & NLP"],
        "files": ["SmartMethods_Web_NLP_Internship_2026.pdf"],
        "caption_ar": """Web Development & NLP 🌐💬

برنامج Web + NLP — React، APIs، و voice/NLP (Voice Assistant & HR platform skills).

#WebDevelopment #NLP #React #JavaScript #SmartMethods #FullStack""",
    },
    {
        "num": 10,
        "offset": "بعد انتهاء التدريب (البوست الأخير)",
        "certs": ["Full-Stack Robotics Engineer (IEEE)"],
        "files": ["SmartMethods_Full_Stack_Robotics_Engineer_IEEE_2026.pdf"],
        "caption_ar": """Full-Stack Robotics Engineer — IEEE 🏆

اختتمت رحلة Smart Methods بشهادة Full-Stack Robotics Engineer (IEEE).

من Web و Mobile إلى ESP32 و Robotics — مشاريع حقيقية:
🔗 Portfolio: hashem-portfolio-six.vercel.app

#IEEE #FullStack #Robotics #IoT #ESP32 #Flutter #React #SmartMethods #Portfolio #OpenToWork""",
    },
]


class PlanPDF(FPDF):
    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")


def main():
    pdf = PlanPDF()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_font("Arial", "", str(FONT))
    pdf.add_font("Arial", "B", str(FONT))
    pdf.add_page()
    pdf.set_font("Arial", "B", 18)
    pdf.multi_cell(0, 10, "LinkedIn - Certificate Posting Plan")
    pdf.set_font("Arial", "", 11)
    pdf.ln(4)
    pdf.multi_cell(
        0,
        6,
        "Hashem Zaid Aidaroos Alhamed | Smart Methods Certificates\n"
        "Recommended gap: 4 days between posts (3-5 days OK). Do NOT post daily.\n"
        "Post #10 (IEEE Full-Stack) ONLY after training ends.\n"
        "Attach: certificate image/PDF + optional project photo or demo video link.",
    )
    pdf.ln(6)

    for post in POSTS:
        pdf.set_font("Arial", "B", 13)
        pdf.set_fill_color(230, 245, 255)
        pdf.multi_cell(0, 8, f"Post {post['num']} — {post['offset']}", fill=True)
        pdf.ln(2)
        pdf.set_font("Arial", "B", 10)
        pdf.cell(0, 6, "Certificate(s):", ln=True)
        pdf.set_font("Arial", "", 10)
        for c in post["certs"]:
            pdf.cell(0, 5, f"  • {c}", ln=True)
        pdf.ln(1)
        pdf.set_font("Arial", "B", 10)
        pdf.cell(0, 6, "PDF file(s):", ln=True)
        pdf.set_font("Arial", "", 9)
        for f in post["files"]:
            pdf.cell(0, 5, f"  • {f}", ln=True)
        pdf.ln(2)
        pdf.set_font("Arial", "B", 10)
        pdf.cell(0, 6, "Caption (copy & paste):", ln=True)
        pdf.set_font("Arial", "", 10)
        pdf.multi_cell(0, 5, post["caption_ar"])
        pdf.ln(4)
        if pdf.get_y() > 250:
            pdf.add_page()

    pdf.add_page()
    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 10, "Quick Tips", ln=True)
    pdf.set_font("Arial", "", 10)
    tips = [
        "• Best posting times (Saudi): 8-10 AM or 7-9 PM",
        "• Posts 2 & 9: use LinkedIn carousel (2 images) when posting 2 certs",
        "• Add RoboDog video link in Posts 7, 8, and 10: youtube.com/shorts/XNNBhHW6kjc",
        "• Pin Post 10 (IEEE) to profile Featured after publishing",
        "• Update portfolio Certificates section is already live",
    ]
    for t in tips:
        pdf.multi_cell(0, 6, t)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Created: {OUT}")


if __name__ == "__main__":
    main()
