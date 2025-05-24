import toast from "react-hot-toast";

export async function makePostRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect
) {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setLoading(false);
      toast.success(`${resourceName} creado con éxito`);
      reset();
      redirect();
    } else {
      setLoading(false);
      if (response.status === 409) {
        toast.error("El stock de Giving Warehouse NO es suficiente");
      } else {
        toast.error("Algo salió mal");
      }
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}

export async function makePutRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  redirect,
  reset
) {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log(response);
      setLoading(false);
      toast.success(`${resourceName} Actualizado con éxito`);
      redirect();
    } else {
      setLoading(false);
      toast.error("Algo salió mal");
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}
