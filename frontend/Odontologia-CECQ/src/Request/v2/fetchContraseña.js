const apiUrl = import.meta.env.VITE_BASE_URL;

export const fetchContraseña = async (oldPassword, newPassword) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append('old_password', oldPassword);
    formData.append('new_password', newPassword);

    const response = await fetch(`${apiUrl}/auth/changepassword/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 400) {
        return { error: 'La contraseña actual es incorrecta.' };
      }
      return { error: 'Error al realizar la solicitud.' }; 
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { error: 'Error al realizar la solicitud.' }; 
  }
};

