import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* SKILLS */}
        <div>
          <h4>Skills</h4>
          <ul>
            <li>Artificial Intelligence (AI)</li>
            <li>Cybersecurity</li>
            <li>Data Analytics</li>
            <li>Digital Marketing</li>
            <li>English Speaking</li>
            <li>Generative AI (GenAI)</li>
            <li>Python</li>
            <li>Microsoft Power BI</li>
            <li>Project Management</li>
          </ul>
        </div>

        {/* CERTIFICATES */}
        <div>
          <h4>Certificates & Programs</h4>
          <ul>
            <li>Google Data Analytics</li>
            <li>Google Cybersecurity</li>
            <li>Google IT Support</li>
            <li>IBM Data Science</li>
            <li>IBM Data Analyst</li>
            <li>Machine Learning</li>
            <li>UI / UX Design</li>
          </ul>
        </div>

        {/* INDUSTRIES */}
        <div>
          <h4>Industries & Careers</h4>
          <ul>
            <li>Business</li>
            <li>Computer Science</li>
            <li>Data Science</li>
            <li>Engineering</li>
            <li>Finance</li>
            <li>Healthcare</li>
            <li>Human Resources</li>
            <li>Information Technology</li>
          </ul>
        </div>

        {/* CAREER RESOURCES */}
        <div>
          <h4>Career Resources</h4>
          <ul>
            <li>Career Aptitude Test</li>
            <li>High-Income Skills</li>
            <li>Interview Preparation</li>
            <li>Resume Building</li>
            <li>Job-Ready Skills</li>
            <li>Learning AI</li>
          </ul>
        </div>

        {/* COURESPHERE */}
        <div>
          <h4>CourseSphere</h4>
          <ul>
            <li>About</li>
            <li>What We Offer</li>
            <li>Careers</li>
            <li>Catalog</li>
            <li>Professional Certificates</li>
            <li>Degrees</li>
          </ul>
        </div>

        {/* COMMUNITY */}
        <div>
          <h4>Community</h4>
          <ul>
            <li>Learners</li>
            <li>Partners</li>
            <li>Blog</li>
            <li>Podcast</li>
            <li>Help Center</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 CourseSphere Inc. All rights reserved.</p>

        <div className="socials">
          <span>Facebook</span>
          <span>LinkedIn</span>
          <span>Twitter</span>
          <span>YouTube</span>
          <span>Instagram</span>
        </div>
      </div>
    </footer>
  );
}
