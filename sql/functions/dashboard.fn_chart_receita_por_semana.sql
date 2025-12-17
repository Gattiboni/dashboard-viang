create or replace function dashboard.fn_chart_receita_por_semana(
  p_start_date date,
  p_end_date date
)
returns table (
  data date,
  sum numeric
)
language sql
stable
as $$
  select
    cast(date_trunc('week', data) as date) as data,
    sum(receita_bruta_total) as sum
  from dashboard.vw_ml_viang_day
  where data between p_start_date and p_end_date
  group by 1
  order by 1 asc;
$$;
