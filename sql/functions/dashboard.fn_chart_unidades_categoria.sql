create or replace function dashboard.fn_chart_unidades_categoria(
  p_start_date date,
  p_end_date date
)
returns table (
  category_name text,
  sum numeric
)
language sql
stable
as $$
  select
    category_name,
    sum(unidades_vendidas) as sum
  from dashboard.vw_ml_category_day_enriched
  where data between p_start_date and p_end_date
  group by category_name
  order by sum desc, category_name asc;
$$;
