
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { Button } from './ui/button';
import panduanInstalasi from '../panduan-instalasi.md?raw';
import { Download } from 'lucide-react';

const PanduanPage = () => {
  // Function to generate and download PDF
  const handleDownloadPDF = () => {
    // This is a placeholder for PDF generation functionality
    // In a real application, we would use a library like jspdf or html2pdf
    // For now, we'll just download the markdown file
    const element = document.createElement('a');
    const file = new Blob([panduanInstalasi], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'panduan-instalasi-rab-ahsp.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Convert markdown to HTML (basic conversion for display purposes)
  const markdownToHTML = (markdown: string) => {
    let html = markdown
      // Convert headers
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      // Convert lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      // Convert code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded my-4 overflow-x-auto text-sm"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      // Convert paragraphs
      .replace(/^(?!<h|<li|<pre|<code)(.*$)/gim, '<p class="my-2">$1</p>')
      // Convert links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
    
    // Replace consecutive list items with ul or ol tags
    html = html.replace(/<li class="ml-6 list-disc">([\s\S]*?)(?=<\/li>)<\/li>(?!\s*<li)/g, '<ul class="my-3">$&</ul>');
    html = html.replace(/<li class="ml-6 list-decimal">([\s\S]*?)(?=<\/li>)<\/li>(?!\s*<li)/g, '<ol class="my-3">$&</ol>');
    
    return html;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Panduan Instalasi</h1>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download size={16} />
            Download Panduan
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
