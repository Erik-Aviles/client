"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import ImageInput from "@/components/FormInputs/ImageInput";
import RichTextEditorInput from "@/components/FormInputs/RichTextEditorInput";
import RichTextEditor from "@/components/FormInputs/RichTextEditorInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { categories } from "@/utils/general/categories";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewTraining({ initialData = {}, isUpdate = false }) {
  const [imageUrl, setImageUrl] = useState("");
  const contentMain = `
  <h1 style="text-align: center;">Título Principal (H1)</h1>
  <h2 style="text-align: center;">Empieza a escribir aquí el contenido de tu capacitación</h2>

  <p style="text-align: justify;">
    Este es un <strong>editor enriquecido</strong> con múltiples funcionalidades. Puedes escribir texto en <em>cursiva</em>, <u>subrayado</u>, <s>tachado</s> o incluso <code>formato código</code>. También puedes <mark>resaltar texto</mark> fácilmente.
  </p>

  <h3>Encabezados</h3>
  <p>Utiliza títulos H1, H2, H3 o H4 para organizar tu contenido.</p>

  <h3>Listas</h3>
  <ul>
    <li>Lista desordenada</li>
    <li>Otro elemento</li>
  </ul>
  <ol>
    <li>Lista ordenada</li>
    <li>Segundo ítem</li>
  </ol>

  <h3>Bloques especiales</h3>
  <blockquote>Cita de ejemplo que puedes usar como referencia</blockquote>
  <hr />

  <h3>Subíndices y Superíndices</h3>
  <p>
    Fórmula química: H<sub>2</sub>O <br />
    Notación matemática: E = mc<sup>2</sup>
  </p>

  <h3>Enlaces</h3>
  <p>
    Visita <a href="https://tiptap.dev" target="_blank" rel="noopener noreferrer">Tiptap.dev</a> para más información.
  </p>

  <h3>Alineación de texto</h3>
  <p style="text-align: left;">Alineado a la izquierda</p>
  <p style="text-align: center;">Centrado</p>
  <p style="text-align: right;">Alineado a la derecha</p>
  <p style="text-align: justify;">
    Justificado: Este texto se ajusta a ambos lados del contenedor para lograr una apariencia limpia y profesional. Ideal para párrafos largos.
  </p>

  <h3>Imagen de ejemplo</h3>
  <p>Esta es una imagen insertada desde base64:</p>
 <img 
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAG1BMVEXMzMyWlpbZ2dnU1NTR0dG+vr6pqamjo6OWlpbo6Og2NjdtxquvAAABHklEQVR4nO3aMQ6DMBBF0X9n7e9ktm1gNpBChoxjK65yL5OcfEJDmBgYGBgYGBgYGBgYGBoaBn4HV91rOeXV5vXq3X+9bHe53J8xb3+u38eu07XleZ9UtLPzR/Nba0d57a4nfaXZ16Xms9tQWXva5zHzS7vcC1vfxXvvNzS31zu5vaZnDMPXtDnTmqYjv0XLfu5ucxVPdn57baZZfbd4bdvbm74xNbdRtn8sDRwYGBgYGBgYGBgYGBgYGBgYGBg+AsKDHruTVXBaAAAAAElFTkSuQmCC" 
    alt="Imagen de ejemplo"
    style="max-width: 100%; height: auto;"
  />
  <h3>Deshacer / Rehacer</h3>
  <p>Usa los botones ↩️ y ↪️ para deshacer o rehacer cambios.</p>

  <p style="text-align: center;">
    📝 ¡Empieza a crear contenido interactivo y dinámico con todas estas herramientas!
  </p>
`;

  const [content, setContent] = useState(contentMain);
  const [loading, setLoading] = useState(false);

  console.log(content);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  });
  const isActive = watch("isActive");

  async function onSubmit(data) {
    /* {
      id, 
      title, 
      expertId,
      categoryId,
      slug, 
      description, 
      content,
      imageUrl, 
      isActive
    } */
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;
    console.log(data);
     makePostRequest(setLoading, "api/trainings", data, "Capacitación ", reset);
    setImageUrl("");
    setContent("")
  }

  return (
    <div>
      <FormHeader
        title={isUpdate ? "Actualizar Capacitación" : "Nueva Capacitación"}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <ToggleInput
            label="Estado de la Capacitación"
            name="isActive"
            isActive={isActive}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />

          <TextInput
            label="Título la capacitación"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="seleccionar categoria"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <TextareaInput
            label="Descripción de la Capacitación"
            name="description"
            register={register}
            errors={errors}
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="trainingImageUploader"
            label="Imagen de la capacitación"
          />
          {/* content editor */}
          <RichTextEditorInput
            label="Contenido de la capacitación"
            content={content}
            onChange={setContent}
            placeholder="Escribe tu capacitación"
          />
        </div>

        <div className="sm:col-span-2 flex gap-3 justify-end py-4">
          <button type="button" className="inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
            Cancelar
          </button>
          <SubmitButton
            isLoading={loading}
            buttonTitle={isUpdate ? "Actualizar" : "Crear Capacitación"}
            buttonLoading={"Creando capacitación..."}
          />
        </div>
      </form>
    </div>
  );
}
