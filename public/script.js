document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOM completamente cargado"); // Verificación en consola

    const form = document.getElementById('registration-form');
    console.log("🔍 Buscando el formulario...", form);

    if (!form) {
        console.error("❌ No se encontró el formulario con ID 'registration-form'. Revisa que el ID sea correcto en suscripcion.html.");
        return;
    }

    console.log("✅ Formulario encontrado:", form);

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita recargar la página

        const newUser = {
            nombre: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch('/api/suscriptores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('✅ Registro exitoso:', result);
            alert('Registro exitoso');

            form.reset(); // Limpia el formulario después del registro
        } catch (error) {
            console.error('❌ Error al registrar usuario:', error.message);
        }
    });
});