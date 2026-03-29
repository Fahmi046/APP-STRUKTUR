import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// --- Ekspor tipe dan interface ---
export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "textarea"
  | "toggle";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  toggleTrueValue?: string;
  toggleFalseValue?: string;
  defaultValue?: string | boolean;
  rows?: number;
}

interface GenericFormPageProps {
  title: string;
  fields: FieldConfig[];
  initialData: Record<string, any>;
  onSubmit: (data: any) => Promise<any>;
  onSuccess?: () => void;
  onCancel?: () => void;
  hasPhotoField?: boolean;
  photoFieldName?: string;
}

// --- Komponen ---
const GenericFormPage: React.FC<GenericFormPageProps> = ({
  title,
  fields,
  initialData,
  onSubmit,
  onSuccess,
  onCancel,
  hasPhotoField = false,
  photoFieldName = "avatar",
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (field: FieldConfig, checked: boolean) => {
    const value = checked
      ? field.toggleTrueValue || "Aktif"
      : field.toggleFalseValue || "Non-Aktif";
    setFormData((prev) => ({ ...prev, [field.name]: value }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB!");
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = (): boolean => {
    for (const field of fields) {
      if (field.required) {
        const value = formData[field.name];
        if (!value || (typeof value === "string" && !value.trim())) {
          toast.error(`${field.label} wajib diisi!`);
          return false;
        }
        if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
          toast.error("Format email tidak valid!");
          return false;
        }
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);
      let dataToSend: any = { ...formData };
      if (hasPhotoField && photoFile) {
        const fd = new FormData();
        Object.keys(dataToSend).forEach((key) => {
          fd.append(key, dataToSend[key]);
        });
        fd.append(photoFieldName, photoFile);
        dataToSend = fd;
      }
      await onSubmit(dataToSend);
      toast.success(`${title} berhasil disimpan!`);
      if (onSuccess) onSuccess();
      else navigate(-1);
    } catch (error: any) {
      console.error(`Error saving ${title}:`, error);
      const errorMsg =
        error.response?.data?.message || `Gagal menyimpan ${title}`;
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else navigate(-1);
  };

  return (
    <div className="min-h-screen pb-20 text-white bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 border-b bg-background-dark/80 backdrop-blur-md border-slate-800">
        <button
          onClick={handleCancel}
          className="font-medium transition-colors text-slate-400 hover:text-white"
        >
          Batal
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 text-sm font-bold text-white shadow-lg bg-primary rounded-xl shadow-primary/20 disabled:opacity-50"
        >
          {saving ? "..." : "Simpan"}
        </button>
      </header>

      <main className="max-w-md p-4 mx-auto space-y-6 text-center">
        {hasPhotoField && (
          <div className="flex flex-col items-center mb-2">
            <div
              onClick={handlePhotoClick}
              className="relative flex items-center justify-center w-24 h-24 overflow-hidden transition-all border-2 border-dashed rounded-full cursor-pointer bg-slate-900 border-slate-700 hover:border-primary/50 group"
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-3xl transition-colors material-symbols-outlined text-slate-600 group-hover:text-primary">
                  add_a_photo
                </span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-widest font-black">
              {photoPreview
                ? "Klik untuk ganti foto"
                : "Klik untuk upload foto"}
            </p>
          </div>
        )}

        <section className="space-y-5">
          {fields.map((field) => {
            if (field.type === "toggle") {
              const isChecked =
                formData[field.name] === (field.toggleTrueValue || "Aktif");
              return (
                <div
                  key={field.name}
                  className="flex items-center justify-between p-5 border bg-slate-900/50 border-slate-800 rounded-2xl"
                >
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-slate-100">
                      {field.label}
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleToggleChange(field, e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={field.name} className="space-y-2 text-left">
                  <label className="ml-1 text-xs font-bold tracking-wider uppercase text-slate-500">
                    {field.label}
                  </label>
                  <div className="relative">
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 transition-all border outline-none appearance-none bg-slate-900 border-slate-800 rounded-2xl text-slate-100 focus:border-primary"
                    >
                      <option value="">Pilih {field.label}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <span className="absolute -translate-y-1/2 pointer-events-none material-symbols-outlined right-4 top-1/2 text-slate-500">
                      expand_more
                    </span>
                  </div>
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div key={field.name} className="space-y-2 text-left">
                  <label className="ml-1 text-xs font-bold tracking-wider uppercase text-slate-500">
                    {field.label}
                  </label>
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    rows={field.rows || 3}
                    className="w-full px-4 py-4 transition-all border outline-none resize-none bg-slate-900 border-slate-800 rounded-2xl text-slate-100 focus:border-primary"
                    placeholder={field.placeholder || ""}
                  />
                </div>
              );
            }

            return (
              <div key={field.name} className="space-y-2 text-left">
                <label className="ml-1 text-xs font-bold tracking-wider uppercase text-slate-500">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 transition-all border outline-none bg-slate-900 border-slate-800 rounded-2xl text-slate-100 focus:border-primary"
                  placeholder={field.placeholder || ""}
                />
              </div>
            );
          })}
        </section>

        <div className="pt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {saving ? "Sedang Menyimpan..." : `Simpan ${title}`}
          </button>
        </div>
      </main>
    </div>
  );
};

export default GenericFormPage;
