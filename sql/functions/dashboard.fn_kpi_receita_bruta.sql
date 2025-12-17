create or replace function dashboard.fn_kpi_receita_bruta(
  p_start_date date,
  p_end_date date
)
returns numeric
language sql
stable
as $$
  select
    sum(receita_bruta_total)
  from dashboard.vw_ml_viang_day
  where data between p_start_date and p_end_date;
$$;
