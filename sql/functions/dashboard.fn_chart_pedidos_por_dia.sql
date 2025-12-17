create or replace function dashboard.fn_chart_pedidos_por_dia(
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
    data,
    sum(pedidos_totais) as sum
  from dashboard.vw_ml_viang_day
  where data between p_start_date and p_end_date
  group by data
  order by data asc;
$$;
