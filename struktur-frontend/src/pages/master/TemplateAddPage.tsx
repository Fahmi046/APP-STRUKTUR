import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TemplateAddPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [tags, setTags] = useState(["Kontrak", "Vendor"]);
  const [inputValue, setInputValue] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
        >
          Batal
        </button>
        <h1 className="text-white text-lg font-bold">Tambah Template</h1>
        <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">
          Simpan
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-5">
        {/* Section: Upload File */}
        <section className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 text-center">
            File Template
          </h2>

          <div className="relative border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 bg-slate-900/30 hover:border-primary/50 transition-colors group">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept=".pdf,.docx,.xlsx"
            />
            <span className="material-symbols-outlined text-primary text-5xl transition-transform group-hover:-translate-y-1">
              cloud_upload
            </span>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">
                Klik atau seret file ke sini
              </p>
              <p className="text-[10px] text-slate-500 font-medium italic">
                PDF, DOCX, XLSX (Max. 10MB)
              </p>
            </div>
          </div>

          {/* File Selected Preview */}
          {selectedFile && (
            <div className="mt-4 flex items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-top-2">
              <div className="bg-slate-700 p-2 rounded-lg mr-3">
                <span className="material-symbols-outlined text-white">
                  description
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {selectedFile.size}
                </p>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-primary hover:bg-primary/10 p-1 rounded-full"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}
        </section>

        {/* Section: Document Info */}
        <section className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800 space-y-5">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Informasi Dokumen
          </h2>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Nama Dokumen <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary transition-all placeholder:text-slate-600"
              placeholder="Contoh: Template Kontrak Vendor"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Kategori
            </label>
            <div className="relative">
              <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary appearance-none outline-none">
                <option value="" disabled selected>
                  Pilih Kategori
                </option>
                <option value="legal">Legal & Hukum</option>
                <option value="hr">SDM / HRD</option>
                <option value="finance">Keuangan</option>
                <option value="marketing">Pemasaran</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-3 text-slate-500 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Deskripsi
            </label>
            <textarea
              rows={3}
              className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary transition-all resize-none placeholder:text-slate-600"
              placeholder="Jelaskan kegunaan template ini..."
            />
          </div>
        </section>

        {/* Section: Metadata */}
        <section className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800 space-y-5">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Metadata & Versi
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Versi
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary"
                placeholder="v1.0.0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                ID Ref
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary"
                placeholder="REF-001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Tags
            </label>
            <div className="bg-slate-800 rounded-xl p-2 min-h-[52px] flex flex-wrap gap-2 items-center border border-transparent focus-within:border-primary/30 transition-colors">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-slate-700 text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-600 uppercase tracking-tighter"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-2 text-slate-400 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      close
                    </span>
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={addTag}
                className="bg-transparent border-none p-1 text-xs text-white focus:ring-0 flex-1 min-w-[100px]"
                placeholder="Ketik lalu Enter..."
              />
            </div>
          </div>
        </section>

        {/* Action Footer */}
        <div className="pt-6 pb-8 text-center">
          <button className="w-full border border-red-500/30 text-red-500 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500/5 transition-colors active:scale-[0.98]">
            Hapus Template
          </button>
          <p className="text-[10px] text-slate-600 mt-4 font-bold uppercase tracking-widest">
            Aksi ini bersifat permanen
          </p>
        </div>
      </main>
    </div>
  );
};

export default TemplateAddPage;
