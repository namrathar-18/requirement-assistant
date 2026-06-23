import { Link } from "react-router-dom";
import { FileText, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold gradient-text">ClarityAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered requirement clarification for freelancers and agencies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ClarityAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
