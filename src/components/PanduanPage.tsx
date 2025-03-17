
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { Button } from './ui/button';
import panduanInstalasi from '../panduan-instalasi.md?raw';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PanduanPage = () => {
  const { toast } = useToast();

  // Function to generate and download DOC
  const handleDownloadDOC = () => {
    // Basic conversion from markdown to simple HTML for DOC format
    const htmlContent = markdownToHTML(panduanInstalasi);
    
    // Create a hidden link element
    const element = document.createElement('a');
    
    // Convert HTML to a format that can be opened by MS Word
    // Use a simple HTML wrapper with the necessary meta tags
    const docContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <meta name="ProgId" content="Word.Document">
        <meta name="Generator" content="Microsoft Word 15">
        <meta name="Originator" content="Microsoft Word 15">
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
    
    // Create a Blob containing the HTML with MS Word metadata
    const file = new Blob([docContent], { type: 'application/msword' });
    
    // Set the URL and filename for the download
    element.href = URL.createObjectURL(file);
    element.download = 'panduan-instalasi-rab-ahsp.doc';
    
    // Trigger the download
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Berhasil mengunduh panduan",
      description: "Panduan instalasi telah berhasil diunduh",
    });
  };

  // Convert markdown to HTML (basic conversion for display purposes)
  const markdownToHTML = (markdown: string) => {
    let html = markdown
      // Convert headers
      .replace(/^# (.*$)/gim, '<h1 style="font-size: 24pt; font-weight: bold; margin-top: 20pt; margin-bottom: 10pt">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size: 18pt; font-weight: bold; margin-top: 16pt; margin-bottom: 8pt">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 style="font-size: 14pt; font-weight: bold; margin-top: 14pt; margin-bottom: 6pt">$1</h3>')
      // Convert lists
      .replace(/^\d+\. (.*$)/gim, '<li style="margin-left: 24pt">$1</li>')
      .replace(/^- (.*$)/gim, '<li style="margin-left: 24pt">$1</li>')
      // Convert code blocks
      .replace(/```([\s\S]*?)```/g, '<pre style="background-color: #f5f5f5; padding: 10pt; border-radius: 4pt; font-family: Consolas, monospace; white-space: pre-wrap;"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="font-family: Consolas, monospace; background-color: #f5f5f5; padding: 2pt;">$1</code>')
      // Convert paragraphs
      .replace(/^(?!<h|<li|<pre|<code)(.*$)/gim, '<p style="margin-top: 8pt; margin-bottom: 8pt">$1</p>')
      // Convert links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #0066cc; text-decoration: underline;">$1</a>');
    
    // Replace consecutive list items with ul or ol tags
    html = html.replace(/<li style="margin-left: 24pt">([\s\S]*?)(?=<\/li>)<\/li>(?!\s*<li)/g, '<ul style="margin-top: 8pt; margin-bottom: 8pt">$&</ul>');
    html = html.replace(/<li style="margin-left: 24pt">([\s\S]*?)(?=<\/li>)<\/li>(?!\s*<li)/g, '<ol style="margin-top: 8pt; margin-bottom: 8pt">$&</ol>');
    
    return html;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Panduan Instalasi</h1>
          <Button onClick={handleDownloadDOC} className="flex items-center gap-2">
            <Download size={16} />
            Download Panduan (DOC)
          </Button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownToHTML(panduanInstalasi) }}
          />
        </div>
        
        <div className="text-center mt-8 mb-4">
          <Link to="/">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PanduanPage;
