import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Painel() {
  const router = useRouter();
  const { cpf } = router.query;
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (cpf) {
      fetch(`/api/usuario?cpf=${cpf}`)
        .then(res => res.json())
        .then(data => setUsuario(data));
    }
  }, [cpf]);

  if (!usuario) return <div style={{ padding: '20px' }}>Carregando...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Painel do Cliente</h2>
      <p><strong>CPF:</strong> {usuario.cpf}</p>
      <p><strong>Saldo:</strong> R${usuario.saldo}</p>
      <p><strong>Bots ativados:</strong> {usuario.bots.length}</p>
    </div>
  );
}
